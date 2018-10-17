import React, { Fragment } from 'react';
import GlobalStyles from 'stylesheets/GlobalStyles';

import { createGlobalStyle } from 'styled-components';

const StorybookStyles = createGlobalStyle`
	html {
		padding: 20px;
	}
`;

const Wrapper = (story) => (
	<Fragment>
		<GlobalStyles />
		<StorybookStyles />
		{story()}
	</Fragment>
);

export default Wrapper;
