import store from 'store2';

import { AUTH_TOKEN_KEY, AUTH_TOKEN_RETRIEVED_AT } from './constants';

// eslint-disable-next-line
const log = (msg, ...args) => {
	// window.console.log('[TokenStorage]:', msg, ...args);
};

function parseISOString(s) {
	var b = s.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

class TokenStorage {
	access_token = null;
	refresh_token = null;
	expires_in = null;
	retrievedAt = null;
	refreshTimeout = null;

	static makeExpiresInGraceful(expiresIn) {
		return expiresIn > 300 ? expiresIn - 300 : expiresIn;
	}

	constructor({ onInitialized = () => {}, onExpire }) {
		log('constructor');
		this.onInitialized = onInitialized;
		this.onExpire = onExpire;
		this.initialize = this.initialize.bind(this);
		this.callOnExpire = this.callOnExpire.bind(this);
		this.expiresAt = this.expiresAt.bind(this);
		this.currentExpiresIn = this.currentExpiresIn.bind(this);
		this.storeAccessToken = this.storeAccessToken.bind(this);
		this.isTokenPresent = this.isTokenPresent.bind(this);
		this.isAccessTokenExpired = this.isAccessTokenExpired.bind(this);
		this.reset = this.reset.bind(this);
		this.initialize({ initial: true });
	}

	clearRefreshTimeout() {
		if (this.refreshTimeout) {
			window.clearTimeout(this.refreshTimeout);
			this.refreshTimeout = null;
			log('refreshTimeout cleared');
		}
	}

	initialize({ initial } = {}) {
		log('initialize');
		this.clearRefreshTimeout();
		const { accessToken, expiresIn } = store.get(AUTH_TOKEN_KEY) || {};
		this.accessToken = accessToken || null;
		2;
		this.expiresIn = expiresIn || null;
		const retrievedAtIsoStr = store.get(AUTH_TOKEN_RETRIEVED_AT) || null;
		log('localStorage read:', { accessToken, expiresIn, retrievedAtIsoStr });
		this.retrievedAt = retrievedAtIsoStr ? parseISOString(retrievedAtIsoStr) : null;

		if (
			!(
				(this.accessToken && this.expiresIn && this.retrievedAt) ||
				(!this.accessToken && !this.expiresIn && !this.retrievedAt)
			)
		) {
			// inconsistent storage state
			this.reset();
			return;
		}

		if (this.isTokenPresent()) {
			// we have some token, check if its expired
			log('we have some token, check if its expired');
			if (this.isAccessTokenExpired()) {
				// log('expired');
				// this.callOnExpire().then(() => {
				// 	if (initial) {
				// 		log('call onInitialized');
				// 		this.onInitialized();
				// 	}
				// });
			} else {
				const expireIn = TokenStorage.makeExpiresInGraceful(this.currentExpiresIn());
				log('setting refreshTimeout to', expireIn);
				this.refreshTimeout = window.setTimeout(() => {
					this.callOnExpire();
				}, expireIn);
				if (initial) {
					log('call onInitialized');
					this.onInitialized();
				}
			}
		} else {
			// there is no token to analyse
			log('there is no token to analyse');
			if (initial) {
				log('call onInitialized');
				this.onInitialized();
			}
		}
	}

	callOnExpire() {
		// eslint-disable-next-line
		return Promise.resolve(this.onExpire({ refreshToken: this.refresh_token }))
			.then((token) => {
				this.storeAccessToken(token);
			})
			.catch((error) => {
				window.console.error(error);
				this.reset();
			});
	}

	expiresAt() {
		return new Date(this.retrievedAt.getTime() + 1000 * this.expiresIn);
	}

	currentExpiresIn() {
		if (this.isAccessTokenExpired()) {
			return 0;
		}
		return this.expiresAt().getTime() - new Date().getTime();
	}

	storeAccessToken({ accessToken, expiresIn }) {
		log('storeAccessToken');
		store.set(AUTH_TOKEN_KEY, { accessToken, expiresIn });
		store.set(AUTH_TOKEN_RETRIEVED_AT, new Date().toISOString());
		this.initialize();
	}

	isTokenPresent() {
		return !!this.retrievedAt;
	}

	isAccessTokenExpired() {
		const isExpired = !this.retrievedAt || this.expiresAt() <= new Date();
		log('isExpired', isExpired);
		return isExpired;
	}

	reset() {
		log('reset');
		store.remove(AUTH_TOKEN_KEY);
		store.remove(AUTH_TOKEN_RETRIEVED_AT);
		this.initialize();
	}
}

export default TokenStorage;
