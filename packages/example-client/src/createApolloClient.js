import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import apolloLogger from 'apollo-link-logger';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createDefaultApolloClient } from '@usertech/apollo-client-utils';

import {getAuthorizationHeader} from 'modules/token-storage';

const setAuthorizationLink = setContext((request, previousContext) => {
	const authorization = getAuthorizationHeader();
	if (authorization) {
		return {
			...previousContext,
			headers: { authorization },
		};
	}
	return previousContext;
});

const createApolloClient = async () => {
	const link = ApolloLink.from([
		setAuthorizationLink,
		apolloLogger,
		split(
			({ query }) => {
				const { kind, operation } = getMainDefinition(query);
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			new WebSocketLink({
				uri: process.env.GRAPHQL_WS_URL,
				options: {
					reconnect: true,
				},
			}),
			ApolloLink.from([
				...(process.env.NODE_ENV !== 'production' ? [require('apollo-link-logger').default] : []),
				new HttpLink({ uri: process.env.GRAPHQL_API_URL }),
			]),
		),
	]);
	return await createDefaultApolloClient({ link, useIntrospectionFragmentMatcher: true });
};

export default createApolloClient;
