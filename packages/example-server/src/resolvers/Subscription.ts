export default {
	channelMessagesStream: {
		resolve: (payload, args, context, info) => {
			// console.log(payload);
			return payload;
		},
		subscribe: async (root, { channelId }, context) => {
			const i = await context.prisma.$subscribe
				.message({
					mutation_in: ['CREATED'],
					node: { channel: { id: channelId } },
				})
				.node();
			return i;
		},
	},
};
