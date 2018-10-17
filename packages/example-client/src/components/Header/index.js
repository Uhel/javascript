import React from 'react';
import styled from 'styled-components';
import Box from 'primitives/Box';
import Space from 'primitives/Space';
import Flex, { FlexItem } from 'styled-flex-component';

const HeaderBox = styled(Box)`
	height: 60px;
`;

const Header = ({ logo, leftContent, rightContent }) => (
	<HeaderBox>
		<Flex full alignCenter>
			<Space />
			<FlexItem>{logo}</FlexItem>
			<FlexItem>{leftContent}</FlexItem>
			<FlexItem grow={1} />
			<FlexItem>{rightContent}</FlexItem>
		</Flex>
	</HeaderBox>
);

export default Header;
