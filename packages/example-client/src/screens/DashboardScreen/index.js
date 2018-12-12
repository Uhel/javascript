import React from 'react';
import { compose, pure, lifecycle, withHandlers } from 'recompose';
import { Form, Field } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

import ScreenLayout from 'components/ScreenLayout';
import Header from 'components/Header';

import Flex, { FlexItem } from 'styled-flex-component';
import withAuthz from 'decorators/withAuthz';
import TextareaFormControl from 'form-controls/TextareaFormControl';
import Space from 'primitives/Space';
import Button from 'components/Button';
import Message from 'components/Message';

import DashboardScreenQuery from './DashboardScreenQuery.gql';
import SendMessageMutation from './SendMessageMutation.gql';
import ChannelStreamSubscription from './ChannelStreamSubscription.gql';

const Lifecycle = lifecycle({
	componentDidMount() {
		this.props.componentDidMount(this.props);
	},
})(() => null);

const withDashboardScreen = compose(
	// withAuthz(),
	withHandlers(() => {
		let scrollAnchor;
		let textArea;
		return {
			captureScrollAnchor: () => (e) => {
				scrollAnchor = e;
			},
			captureTextArea: () => (e) => {
				textArea = e;
			},
			scrollToBottom: () => (smooth) => {
				scrollAnchor.scrollIntoView(smooth ? { behavior: 'smooth' } : undefined);
			},
			focusTextArea: () => () => {
				textArea.focus();
			},
		};
	}),
	pure,
);

const renderDashboardScreen = ({
	captureScrollAnchor,
	scrollToBottom,
	captureTextArea,
	focusTextArea,
}) => {
	return (
		<Query query={DashboardScreenQuery}>
			{({ loading, data, error, subscribeToMore }) => {
				if (loading || !data) {
					return 'Loading...';
				}
				const {
					defaultChannel,
					defaultMessages: { edges: messages },
				} = data;
				const channelId = defaultChannel.id;
				return (
					<ScreenLayout
						header={<Header logo="chat app ¯\_(ツ)_/¯" />}
						footer={
							<Mutation mutation={SendMessageMutation}>
								{(sendMessage, { loading }) => {
									return (
										<Form
											onSubmit={({ content }, { reset }) => {
												sendMessage({
													variables: {
														channelId,
														input: { content },
													},
												}).then(() => {
													reset();
													focusTextArea();
												});
											}}
										>
											{({ handleSubmit }) => {
												return (
													<form onSubmit={handleSubmit}>
														<Flex full center>
															<FlexItem grow={1}>
																<Field
																	name="content"
																	render={({ input }) => {
																		return (
																			<TextareaFormControl
																				{...input}
																				innerRef={captureTextArea}
																				disabled={loading}
																				autoFocus
																				onKeyPress={(e) => {
																					if (e.key === 'Enter') {
																						if (!e.shiftKey) {
																							handleSubmit();
																						}
																					}
																				}}
																			/>
																		);
																	}}
																/>
															</FlexItem>
															<Space small />
															<FlexItem>
																<Button primary inverse busy={loading}>
																	Send
																</Button>
															</FlexItem>
														</Flex>
													</form>
												);
											}}
										</Form>
									);
								}}
							</Mutation>
						}
					>
						<h2>Runtime Env Vars</h2>
						<pre>{JSON.stringify(window.env, null, 2)}</pre>
						{loading && <div>loading</div>}
						{error && <pre>{JSON.stringify(error, null, 2)}</pre>}

						{messages.reverse().map(({ node: message }) => (
							<Message key={message.id} {...message} />
						))}
						<div ref={captureScrollAnchor} />
						<Lifecycle
							componentDidMount={() => {
								scrollToBottom();
								subscribeToMore({
									document: ChannelStreamSubscription,
									variables: { channelId },
									updateQuery: (
										cache,
										{
											subscriptionData: {
												data: { channelMessagesStream: message },
											},
										},
									) => {
										setTimeout(() => scrollToBottom(true), 0);
										return {
											...cache,
											defaultMessages: {
												...cache.defaultMessages,
												edges: [
													{ node: message, __typename: 'MessageEdge' },
													...cache.defaultMessages.edges,
												],
											},
										};
									},
								});
							}}
						/>
					</ScreenLayout>
				);
			}}
		</Query>
	);
};

const DashboardScreen = withDashboardScreen(renderDashboardScreen);

export default DashboardScreen;
