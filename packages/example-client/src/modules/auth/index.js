// import {  } from '@usertech/window-env';
import { compose, withHandlers, withStateHandlers, lifecycle } from 'recompose';
import { WebAuth } from 'auth0-js/dist/auth0';

import { TokenStorage } from 'modules/token-storage';
import { ID_PATH_LOGIN_CALLBACK } from 'paths';

const getEnv = (key) => window.env && window.env[key];

const webAuth = new WebAuth({
	domain: getEnv('AUTH_DOMAIN'),
	clientID: getEnv('AUTH_CLIENT_ID'),
	audience: getEnv('AUTH_AUDIENCE'),
	responseType: 'token id_token',
	scope: 'openid email profile',
	redirectUri: `${window.location.origin}${ID_PATH_LOGIN_CALLBACK}`,
});

export const tokenStorage = new TokenStorage({
	onExpire: () => {
		window.console.log('Token expired, called onExpire');
		return new Promise((resolve, reject) => {
			webAuth.checkSession({}, (error, result) => {
				if (error) {
					reject(error);
					window.location.reload();
				} else if (result) {
					// store token
					resolve(result);
				}
			});
		});
	},
});

export const withAuthn = () =>
	compose(
		withStateHandlers(
			{
				sessionChecked: false,
				isAuthenticated: false,
			},
			{
				setSessionChecked: () => () => ({ sessionChecked: true }),
				setIsAuthenticated: () => () => ({ isAuthenticated: true }),
			},
		),
		lifecycle({
			componentDidMount() {
				const { setSessionChecked } = this.props;

				if (!window.location.hash.includes('access_token')) {
					if (tokenStorage.isTokenPresent() && !tokenStorage.isAccessTokenExpired()) {
						setSessionChecked();
					} else {
						webAuth.checkSession({}, (error, result) => {
							if (error) {
								tokenStorage.reset();
								// next && navigate(next);
							} else if (result) {
								// store token
								tokenStorage.storeAccessToken(result);
							}
							setSessionChecked();
						});
					}
				} else {
					setSessionChecked();
				}
			},
		}),
	);

export const withLogout = compose(
	withHandlers({
		logout: () => () => {
			tokenStorage.reset();
			webAuth.logout({ returnTo: `${window.location.origin}` });
		},
	}),
);

export const withLogin = compose(
	withHandlers({
		login: () => () => {
			webAuth.authorize()
		},
	}),
);

export const withLoginCallbackHandler = compose(
	withStateHandlers(
		{
			hashParsed: false,
			next: false,
		},
		{
			setHashParsed: () => ({ next } = {}) => ({ hashParsed: true, next }),
		},
	),
	lifecycle({
		componentDidMount() {
			const { setHashParsed } = this.props;

			webAuth.parseHash({}, (error, result) => {
				if (error) {
					window.console.warn(error);
					throw error;
					// window.location.href = '/';
				} else if (result) {
					// store token
					tokenStorage.storeAccessToken(result);
					let state;
					try {
						state = JSON.parse(result.state);
					} catch (error) {
						window.console.log(error);
					}
					if (typeof state === 'object' && state.next) {
						setHashParsed({ next: state.next });
					} else {
						setHashParsed();
					}
				}
			});
		},
	}),
);
