/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUserQuery
// ====================================================

export interface CurrentUserQuery_currentUser {
  __typename: "User";
  id: string;
  fullName: string | null;
  email: string;
  picture: string | null;
}

export interface CurrentUserQuery {
  currentUser: CurrentUserQuery_currentUser;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ChannelStreamSubscription
// ====================================================

export interface ChannelStreamSubscription_channelMessagesStream_author {
  __typename: "User";
  id: string;
  fullName: string | null;
  picture: string | null;
  email: string;
}

export interface ChannelStreamSubscription_channelMessagesStream {
  __typename: "Message";
  id: string;
  content: string;
  createdAt: any;
  author: ChannelStreamSubscription_channelMessagesStream_author;
}

export interface ChannelStreamSubscription {
  channelMessagesStream: ChannelStreamSubscription_channelMessagesStream;
}

export interface ChannelStreamSubscriptionVariables {
  channelId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardScreenQuery
// ====================================================

export interface DashboardScreenQuery_currentUser {
  __typename: "User";
  id: string;
  email: string;
  picture: string | null;
}

export interface DashboardScreenQuery_defaultChannel {
  __typename: "Channel";
  id: string;
  title: string;
}

export interface DashboardScreenQuery_defaultMessages_edges_node_author {
  __typename: "User";
  id: string;
  fullName: string | null;
  picture: string | null;
  email: string;
}

export interface DashboardScreenQuery_defaultMessages_edges_node {
  __typename: "Message";
  id: string;
  content: string;
  createdAt: any;
  author: DashboardScreenQuery_defaultMessages_edges_node_author;
}

export interface DashboardScreenQuery_defaultMessages_edges {
  __typename: "MessageEdge";
  node: DashboardScreenQuery_defaultMessages_edges_node;
}

export interface DashboardScreenQuery_defaultMessages {
  __typename: "MessagesConnection";
  edges: DashboardScreenQuery_defaultMessages_edges[];
}

export interface DashboardScreenQuery {
  currentUser: DashboardScreenQuery_currentUser;
  defaultChannel: DashboardScreenQuery_defaultChannel;
  defaultMessages: DashboardScreenQuery_defaultMessages;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendMessageMutation
// ====================================================

export interface SendMessageMutation_sendMessage_author {
  __typename: "User";
  id: string;
  email: string;
  fullName: string | null;
  picture: string | null;
}

export interface SendMessageMutation_sendMessage {
  __typename: "Message";
  id: string;
  createdAt: any;
  content: string;
  author: SendMessageMutation_sendMessage_author;
}

export interface SendMessageMutation {
  sendMessage: SendMessageMutation_sendMessage;
}

export interface SendMessageMutationVariables {
  channelId: string;
  input: MessageInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface MessageInput {
  content: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
