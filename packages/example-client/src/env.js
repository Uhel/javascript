import { init } from '@usertech/window-env';

init({
	GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
	GRAPHQL_WS_URL: process.env.GRAPHQL_WS_URL,
	AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
	AUTH_DOMAIN: process.env.AUTH_DOMAIN,
	AUTH_AUDIENCE: process.env.AUTH_AUDIENCE,
});
