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
			{
				props: ({ data: { currentUser } }) => {
					debugger;
					return currentUser
				},
			},
		),
		branch(
			({ currentUser }) => !currentUser,
			compose(
				renderComponent(({currentUser}) => {
					return (
						<pre>{JSON.stringify(currentUser, null, 2)}</pre>
					)
					// return (
					// 	<Redirect to={ID_PATH_LOGIN} />
					// );
				}),
			),
		),
	);

export default withAuthz;
