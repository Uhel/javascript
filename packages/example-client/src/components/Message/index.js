import React from 'react';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';

const Content = styled.div`
	white-space: pre-line;
`;

const Message = ({ content, createdAt, author }) => {
	return (
		<div>
			<Flex>
				<FlexItem noShrink>
					<div>
						<img src={author.picture} alt={author.fullName} />
						&nbsp;&nbsp;&nbsp;
					</div>
					{/*<div>{createdAt}</div>*/}
				</FlexItem>
				<FlexItem grow={1}>
					<Flex column>
						<FlexItem>
							<strong>{author.fullName}</strong>
						</FlexItem>
						<FlexItem>
							<Content>{content}</Content>
						</FlexItem>
					</Flex>
				</FlexItem>
			</Flex>
			<br />
		</div>
	);
};

export default Message;
