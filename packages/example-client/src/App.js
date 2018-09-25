import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import { ID_PATH_ROOT, ID_PATH_TASKS, ID_PATH_TASK_DETAIL } from 'paths';

import DashboardScreen from 'screens/DashboardScreen';
import TasksScreen from 'screens/TasksScreen';
import TaskDetailScreen from 'screens/TaskDetailScreen';

import createApolloClient from './createApolloClient';
import Async from 'react-promise';

const App = () => {
	return (
		<Async
			promise={createApolloClient()}
			pending={() => <strong>Loading apollo client...</strong>}
			then={(apolloClient) => (
				<ApolloProvider client={apolloClient}>
					<BrowserRouter>
						{/*PRACTICE: Use Switch component to ensure only first matching Route renders*/}
						<Switch>
							{/*PRACTICE: Make Route exact by default*/}
							<Route exact path={ID_PATH_ROOT} component={DashboardScreen} />
							<Route exact path={ID_PATH_TASKS} component={TasksScreen} />
							<Route exact path={ID_PATH_TASK_DETAIL} component={TaskDetailScreen} />
						</Switch>
					</BrowserRouter>
				</ApolloProvider>
			)}
		/>
	);
};

export default App;
