export default {
	author: ({ id }, vars, context) => {
		return context.prisma.message({ id }).author();
	},
};
