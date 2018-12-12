import store from 'store2';
import { AUTH_TOKEN_KEY } from './constants';

const getAuthorizationHeader = () => {
	const { accessToken } = store.get(AUTH_TOKEN_KEY) || {};
	if (accessToken) {
		return `Bearer ${accessToken}`;
	}
	return;
};

export default getAuthorizationHeader;
