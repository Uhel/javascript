export default {
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
}
