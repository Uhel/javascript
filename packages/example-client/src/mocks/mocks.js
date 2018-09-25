export default {
	Query: () => {
		return {
			hello: (root, variables, context, info) => {
				window.console.log({ root, variables, context, info });
				return 'World!';
			},
		};
	},
};
