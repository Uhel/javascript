import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from 'components/Header';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Color from 'primitives/Color';
import Space from 'primitives/Space';
import Flex, { FlexItem } from 'styled-flex-component';

storiesOf('Header', module)
	.add('default', () => <Header />)
	.add('with some content', () => (
		<Header
			logo={
				<Flex center>
					<FlexItem>
						<Color>
							<Icon name="bubbles" />
						</Color>
					</FlexItem>
					<Space small />
					<FlexItem>
						<Color>
							<h1>U+Talk</h1>
						</Color>
					</FlexItem>
				</Flex>
			}
			rightContent={
				<Flex full right alignCenter>
					<FlexItem>
						<Button primary small>
							Click me
						</Button>
					</FlexItem>
					<Space small />
					<FlexItem>
						<Button>Click me</Button>
					</FlexItem>
					<Space small />
				</Flex>
			}
		/>
	));
