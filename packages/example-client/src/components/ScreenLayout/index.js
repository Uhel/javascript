import React from 'react';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';

const Content = styled(FlexItem)`
	position: relative;
`;

const ScrollArea = styled(FlexItem)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: auto;
`;

const ScreenLayout = ({ header, children, footer }) => {
	return (
		<Flex full column>
			<FlexItem>{header}</FlexItem>
			<Content grow={1}>
				<ScrollArea>{children}</ScrollArea>
			</Content>
			<FlexItem>{footer}</FlexItem>
		</Flex>
	);
};

export default ScreenLayout;
