import React from 'react';
import { compose, pure } from 'recompose';
import { Query } from 'react-apollo';

import DashboardScreenQuery from './DashboardScreenQuery.gql';

const withDashboardScreen = compose(pure);

const renderDashboardScreen = () => {
	return (
		<div>
			<h1>DashboardScreen</h1>
			<Query query={DashboardScreenQuery}>
				{({ loading, data, error }) => {
					if (loading) {
						return 'Loading...';
					}
					if (error) {
						return <pre>{JSON.stringify(error, null, 2)}</pre>;
					}
					return <pre>{JSON.stringify(data, null, 2)}</pre>;
				}}
			</Query>
		</div>
	);
};

const DashboardScreen = withDashboardScreen(renderDashboardScreen);

export default DashboardScreen;
