import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createDefaultApolloClient, createMockLink } from '@usertech/apollo-client-utils';

import SimpleAuthService from 'utils/SimpleAuthService';

// import typeDefs from '../../example-server/schema.graphql';
// import resolvers from './mocks/resolvers.js';
// import mocks from './mocks/mocks.js';

const setAuthorizationLink = setContext((request, previousContext) => {
	const authorization = SimpleAuthService.getAuthorizationHeader();
	if (authorization) {
		return {
			...previousContext,
			headers: { authorization },
		};
	}
	return {};
});

const createApolloClient = async () => {
	// const link = createMockLink({
	// 	typeDefs,
	// 	resolvers,
	// 	mocks,
	// 	operationsDelays: {
	// 		DashboardScreenQuery: 600,
	// 		IntrospectionFragmentMatcherQuery: 0,
	// 	},
	// 	defaultOperationDelay: 300,
	// });

	const link = ApolloLink.from([
		setAuthorizationLink,

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
