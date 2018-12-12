import './env';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const renderApp = (Component) => render(<Component />, document.getElementById('root'));

renderApp(App);
