import React from 'react';
import { lifecycle } from 'recompose';
import SimpleAuthService from 'utils/SimpleAuthService';

const LoginScreen = lifecycle({
	componentDidMount() {
		SimpleAuthService.login();
	},
})(() => {
	return <div>login</div>;
});

export default LoginScreen;
