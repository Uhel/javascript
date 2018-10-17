import styled from 'styled-components';
import styledMap from 'styled-map';

const boxBackground = styledMap`
	default: #404e60;
`;
const Box = styled.div`
	background: ${boxBackground};
`;

export default Box;
