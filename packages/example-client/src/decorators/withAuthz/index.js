import React from 'react';
import { compose, pure, branch, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';

import { withAuthn } from 'modules/auth';

import { Redirect } from 'react-router';
import { ID_PATH_LOGIN } from 'paths';
import CurrentUserQuery from './CurrentUserQuery.gql';

const withAuthz = () =>
	compose(
		withAuthn(),
		graphql(
			CurrentUserQuery,
		),
		branch(
			({ data: { loading } }) => loading,
			compose(
				renderComponent(() => {
					return (
						<pre>Loading...</pre>
					);
				}),
			),
		),
		branch(
			({ data: { currentUser } }) => !currentUser,
			compose(
				renderComponent(() => {
					return (
						<Redirect to={ID_PATH_LOGIN} />
					);
				}),
			),
		),
	);

export default withAuthz;
