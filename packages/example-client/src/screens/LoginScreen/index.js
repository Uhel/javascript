import React from 'react';
import {compose, lifecycle } from 'recompose';
import {withLogin} from 'modules/auth';

const LoginScreen = compose(withLogin,
	lifecycle({
	componentDidMount() {
		const {login}=this.props;
		login()
	},
}))(() => {
	return <div>login</div>;
});

export default LoginScreen;
