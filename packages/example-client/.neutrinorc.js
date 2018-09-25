module.exports = {
	use: [
		'@usertech/neutrino-preset-eslint-prettier',
		[
			'@neutrinojs/react',
			{
				html: {
					title: 'example-client',
				},
			},
		],
		(neutrino) => neutrino.config.resolve.modules.add(neutrino.options.source),
		'@usertech/neutrino-preset-graphql',
	],
};
