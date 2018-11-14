import auth0 from 'auth0-js';
import store from 'store2';

class Auth {
	authResult;

	auth0 = new auth0.WebAuth({
		domain: process.env.AUTH_DOMAIN,
		clientID: process.env.AUTH_CLIENT_ID,
		redirectUri: `${window.location.origin}/login-callback`,
		responseType: 'token id_token',
		scope: 'openid profile email',
		audience: process.env.AUTH_AUDIENCE,
	});

	constructor() {
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.authResult = store.get('AUTH');
	}

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
		return new Promise((resolve) => {
			this.auth0.parseHash((err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					resolve();
				} else if (err) {
					throw err;
				}
			});
		});
	}

	setSession(authResult) {
		// Set the time that the Access Token will expire at
		let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
		this.authResult = {
			accessToken: authResult.accessToken,
			idToken: authResult.idToken,
			expiresAt,
		};
		store.set('AUTH', this.authResult);
	}

	logout() {
		window.location.reload();
	}

	isAuthenticated() {
		// Check whether the current time is past the
		// Access Token's expiry time
		let expiresAt = JSON.parse(this.authResult.expiresAt);
		return new Date().getTime() < expiresAt;
	}

	getAuthorizationHeader() {
		if (!this.authResult) {
			return;
		}
		return `Bearer ${this.authResult.accessToken}`;
	}
}

const auth = new Auth();

export default auth;
