const { prisma } = require('./generated/prisma-client');
const { GraphQLError } = require('graphql');
const { GraphQLServer } = require('graphql-yoga');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const bootstrapData = require('./bootstrapData');
const AuthenticationClient = require('auth0').AuthenticationClient;

const auth0 = new AuthenticationClient({
	clientID: process.env.AUTH_CLIENT_ID,
	domain: process.env.AUTH_DOMAIN,
});

// prisma.debug = true;

const resolvers = {
	Query: {
		currentUser: (root, vars, context) => {
			return context.user;
		},
		channels: async (root, vars, context) => {
			return context.prisma.channels({ first: 10 });
		},
		channel: async (root, { id }, context) => {
			const channel = await context.prisma.channel({ id });
			return channel;
		},
		defaultChannel: (root, { id }, context) => {
			return context.prisma.channel({ title: 'general' });
		},
		defaultMessages: async (root, { id }, context) => {
			const channel = context.prisma.channel({ title: 'general' });
			const connection = await context.prisma
				.messagesConnection({
					where: { channel: { id: channel.id } },
					orderBy: 'createdAt_DESC',
					first: 50,
				})
				.edges();
			const messages = await context.prisma.messages({
				where: { channel: { id: channel.id } },
				orderBy: 'createdAt_DESC',
				first: 50,
			});
			return {
				edges: connection.map(({ cursor }, idx) => ({ cursor, node: messages[idx] })),
			};
		},
	},
	Mutation: {
		register: (root, { input }, context) => {
			return context.prisma.createUser(input);
		},
		sendMessage: async (root, { channelId, input: { content } }, context) => {
			return context.prisma.createMessage({
				content,
				channel: { connect: { id: channelId } },
				author: { connect: { id: context.user.id } },
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
					.message({
						where: {
							mutation_in: ['CREATED'],
							node: { channel: { id: channelId } },
						},
					})
					.node();
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
	context: (ctx) => {
		return {
			prisma,
			...ctx,
		};
	},
	middlewares: [
		async (resolve, root, args, context, info) => {
			const user = context.request && context.request.user;
			return await resolve(root, args, { ...context, user }, info);
		},
	],
});

const authMiddlewares = [
	server.options.endpoint,
	jwt({
		secret: jwks.expressJwtSecret({
			cache: true,
			rateLimit: true,
			jwksRequestsPerMinute: 5,
			jwksUri: process.env.AUTH_JWKS_URL,
		}),
		audience: process.env.AUTH_AUDIENCE,
		issuer: `https://${process.env.AUTH_DOMAIN}/`,
		algorithms: ['RS256'],
	}),
	async (req, res, next) => {
		if (!req.user) return res.sendStatus(401);

		const sub = req.user.sub;
		const user = await new Promise(async (resolve, reject) => {
			let dbUser = await prisma.user({ sub });
			if (!dbUser) {
				auth0.users.getInfo(req.headers.authorization.split(' ').pop(), function(err, user) {
					if (err) {
						return reject(err);
					}
					const { email, name: fullName, picture } = user;
					dbUser = prisma.createUser({
						sub,
						email,
						fullName,
						picture,
					});
					resolve(dbUser);
				});
			} else {
				resolve(dbUser);
			}
		});

		req.user = user;
		next();
	},
];
server.express.get(...authMiddlewares);
server.express.post(...authMiddlewares);

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
