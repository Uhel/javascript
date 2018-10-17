import React, { Fragment } from 'react';
import styled from 'styled-components';
import styledMap from 'styled-map';

const width = styledMap`
	default: 24px;
	small: 12px;
`;

const Space = styled.div.attrs({ children: <Fragment>&nbsp;</Fragment> })`
	width: ${width};
`;

export default Space;
