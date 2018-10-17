import React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

const req = require.context('./svg');

const icons = req
	.keys()
	.reduce((acc, key) => ({ ...acc, [key.match(/[a-z]+[a-z0-9-]+/)[0]]: req(key) }), {});

const Size = styled.div`
	display: flex;
	align-items: center;
	width: 32px;
	height: 32px;
	svg {
		width: 32px;
		height: 32px;
		* {
			fill: currentColor;
		}
	}
`;

const Icon = pure(({ name }) => {
	const I = icons[name];
	return (
		<Size>
			<I />
		</Size>
	);
});

export default Icon;
