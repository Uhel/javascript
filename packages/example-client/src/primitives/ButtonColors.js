import styledMap from 'styled-map';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

const buttonColor = styledMap`
	default: #6d7884;
	primary: #49afd9;
	danger: #f54f47;
	success: #60b515;
`;
const buttonBackground = (transform = (a) => a) => ({ inverse, ...props }) => {
	return inverse ? 'transparent' : transform(buttonColor(props));
};
const buttonBorder = (transform = (a) => a) => ({ inverse, ...props }) => {
	return inverse ? `1px solid ${transform(buttonColor(props))}` : 'none';
};
const buttonTextColor = (transform = (a) => a) => ({ inverse, ...props }) => {
	return inverse ? transform(buttonColor(props)) : 'black';
};
const ButtonColors = styled.div`
	background: ${buttonBackground()};
	border: ${buttonBorder()};
	color: ${buttonTextColor()};
	&:hover {
		color: ${buttonTextColor(lighten(0.03))};
		background: ${buttonBackground(lighten(0.03))};
	}
	&:focus {
		outline: none;
		color: ${buttonTextColor(darken(0.03))};
		background: ${buttonBackground(darken(0.03))};
	}
	&:active {
		color: ${buttonTextColor(darken(0.07))};
		background: ${buttonBackground(darken(0.07))};
	}
`;

export default ButtonColors;
