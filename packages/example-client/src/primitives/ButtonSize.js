import styledMap from 'styled-map';
import styled from 'styled-components';

const buttonHeight = styledMap`
	default: 36px;
	small: 24px;
`;
const buttonFontSize = styledMap`
	default: 12px;
	small: 11px;
`;
const ButtonSize = styled.div`
	height: ${buttonHeight};
	font-size: ${buttonFontSize};
	padding: 0 12px;
`;

export default ButtonSize;
