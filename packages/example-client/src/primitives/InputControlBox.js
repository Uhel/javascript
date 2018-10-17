import styled from 'styled-components';
import styledMap from 'styled-map';
import is from 'styled-is';

const height = styledMap`
	default: 36px;
`;

const fontSize = styledMap`
	default: 13px;
`;

const borderColorDefault = styledMap`
	default: black;
`;
const borderColorHover = styledMap`
	default: black;
`;
const borderColorFocus = styledMap`
	default: black;
`;
const borderColorDanger = styledMap`
	default: black;
`;
const borderColorSuccess = styledMap`
	default: black;
`;
const borderColorDisabled = styledMap`
	default: black;
`;

const InputControlBox = styled.div.attrs({ size: 1000 })`
	display: flex;
	width: 100%;
	align-items: center;
	border-radius: 3px;
	height: ${height};
	font-size: ${fontSize};

	color: #adbbc4;
	border: 1px solid ${borderColorDefault};
	background: #17242b;
	&:hover {
		border-color: ${borderColorHover};
	}
	&:focus {
		outline: none;
		border-color: ${borderColorFocus};
	}
	&& {
		border-color: ${is('isFocused')`${borderColorFocus}`};
		border-color: ${is('hasError')`${borderColorDanger} !important`};
		border-color: ${is('hasSuccess')`${borderColorSuccess} !important`};
	}
	&:disabled {
		border-color: ${borderColorDisabled};
		cursor: not-allowed;
		opacity: 0.5;
	}
`;
export default InputControlBox;
