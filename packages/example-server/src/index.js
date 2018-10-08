const { prisma } = require('./generated/prisma-client');
const { GraphQLError } = require('graphql');
const { GraphQLServer } = require('graphql-yoga');
const bootstrapData = require('./bootstrapData');

prisma.debug = true;

const checkUser = (context) => {
	if (!context.user) {
		throw new GraphQLError('Unauthorized');
	}
	return context.user;
};

const resolvers = {
	Query: {
		channels: async (root, vars, context) => {
			return context.prisma.channels({ first: 10 });
		},
		channel: async (root, { id }, context) => {
			const channel = await context.prisma.channel({ id });
			console.log(channel);
			return channel;
		},
	},
	Mutation: {
		register: (root, { input }, context) => {
			return context.prisma.createUser(input);
		},
		sendMessage: async (root, { channelId, input: { content } }, context) => {
			const john = await context.prisma.user({ email: 'john@doe.com' });
			return context.prisma.createMessage({
				content,
				channel: { connect: { id: channelId } },
				author: { connect: { id: john.id } },
			});
		},
	},
	Subscription: {
		channelMessagesStream: {
			resolve: (payload, args, context, info) => {
				// console.log(payload);
				return payload;
			},
			subscribe: async (root, { channelId }, context) => {
				const i = await context.prisma.$subscribe
					// .message()
					// .channel({node: {id:channelId}})
					// .node()
					.message({
						where: {
							mutation_in: ['CREATED'],
							node: { channel: { id: channelId } },
						},
					})
					.node();
				// i.next().then((a) => {
				// 	console.log('fdsjhagfdshfjdskajfhdskafgsdhjak', a);
				// });
				// i.next().then((a) => {
				// 	console.log('fdsjhagfdshfjdskajfhdskafgsdhjak', a);
				// });
				return i;
			},
		},
	},
	Channel: {
		messages: ({ id }, vars, context) => {
			return context.prisma.channel({ id }).messages();
		},
	},
	Message: {
		author: ({ id }, vars, context) => {
			return context.prisma.message({ id }).author();
		},
	},
};

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
	resolvers,
	context: ({ ...ctx }) => {
		return {
			prisma,
			...ctx,
		};
	},
	// middlewares: [
	// 	async (resolve, root, args, context, info) => {
	// 		const authorizationHeader = context.request.get('Authorization');
	// 		let user;
	// 		if (authorizationHeader) {
	// 			const access_token = authorizationHeader.split(' ')[1];
	// 			if (access_token) {
	// 				user = await context.prisma.accessToken({ access_token }).user();
	// 			}
	// 		}
	// 		const result = await resolve(root, args, { ...context, user }, info);
	// 		return result;
	// 	},
	// ],
});

bootstrapData(prisma).then(() => {
	console.log('Data loaded');
	server.start(
		{
			formatError: (error) => {
				return JSON.stringify({ error: error.stack });
			},
		},
		() => console.log('Server is running on http://localhost:4000'),
	);
});
