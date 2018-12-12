export default {
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
};
