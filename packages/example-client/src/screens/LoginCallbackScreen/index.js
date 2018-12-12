import React from 'react';
import { compose } from 'recompose';
import { withNavigation } from '@usertech/react-routing';
import { withLoginCallbackHandler } from 'modules/auth';
import { Redirect } from 'react-router';

const LoginCallbackScreen = compose(
	withNavigation,
	withLoginCallbackHandler,
)(() => {
	return <Redirect to="/" />;
});

export default LoginCallbackScreen;
