import styledMap from 'styled-map';
import styled from 'styled-components';

const color = styledMap`
	default: #6d7884;
	primary: #49afd9;
	danger: #f54f47;
	success: #60b515;
`;

const Color = styled.div`
	display: flex;
	color: ${color};
`;

export default Color;
