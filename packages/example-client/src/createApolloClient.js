import { createDefaultApolloClient, createMockLink } from '@usertech/apollo-client-utils';

import typeDefs from './schema.graphql';
import resolvers from './mocks/resolvers.js';
import mocks from './mocks/mocks.js';

const createApolloClient = async () => {
	const link = createMockLink({
		typeDefs,
		resolvers,
		mocks,
		operationsDelays: {
			DashboardScreenQuery: 600,
			IntrospectionFragmentMatcherQuery: 0,
		},
		defaultOperationDelay: 300,
	});
	return await createDefaultApolloClient({ link, useIntrospectionFragmentMatcher: true });
};

export default createApolloClient;
