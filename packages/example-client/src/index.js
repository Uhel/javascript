import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const renderApp = (Component) =>
	render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root'),
	);

renderApp(App);

// eslint-disable-next-line no-undef
if (module.hot) {
	// eslint-disable-next-line no-undef
	module.hot.accept('./App', () => {
		renderApp(App);
	});
}
