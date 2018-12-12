export default {
	messages: ({ id }, vars, context) => {
		return context.prisma.channel({ id }).messages();
	},
};
