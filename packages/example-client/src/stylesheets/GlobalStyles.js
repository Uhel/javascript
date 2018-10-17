import { createGlobalStyle } from 'styled-components';
import reboot from 'styled-reboot';

const rebootCss = reboot({ fontFamilyBase: `'Muli', sans-serif` });

const GlobalStyles = createGlobalStyle`
	${rebootCss}
	* {
		margin: 0;
	}
	h1, h2, h3, h4, h5, label {
		font-size: inherit;
		margin: 0;
	}
	body, html {
		background: #1b2a32;
		color: #e9ecef;
	}
	body, html, #root {
		height: 100%;
	}
`;

export default GlobalStyles;
