import React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNavigation } from '@usertech/react-routing';

import SimpleAuthService from 'utils/SimpleAuthService';

const LoginCallbackScreen = compose(
	withNavigation,
	lifecycle({
		componentDidMount() {
			const { navigate } = this.props;
			SimpleAuthService.handleAuthentication().then(() => {
				navigate('/');
			});
		},
	}),
)(() => {
	return <div>login success</div>;
});

export default LoginCallbackScreen;
