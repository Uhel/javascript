import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Flex, { FlexItem } from 'styled-flex-component';
import Space from 'primitives/Space';
import ScreenLayout from 'components/ScreenLayout';
import Header from 'components/Header';
import Button from 'components/Button';
import TextareaFormControl from 'form-controls/TextareaFormControl';

storiesOf('ScreenLayout', module).add('default', () => (
	<ScreenLayout
		header={<Header />}
		footer={
			<form
				onSubmit={(e) => {
					e.preventDefault();
					action('submit')(e.target);
				}}
			>
				<Flex full center>
					<FlexItem grow={1}>
						<TextareaFormControl />
					</FlexItem>
					<Space small />
					<FlexItem>
						<Button primary inverse>
							Send
						</Button>
					</FlexItem>
				</Flex>
			</form>
		}
	>
		content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
		<br /> content
	</ScreenLayout>
));
