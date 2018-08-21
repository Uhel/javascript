module.exports = {
	use: [
		'@usertech/neutrino-preset-eslint-prettier',
		[
			'@neutrinojs/react',
			{
				html: {
					title: 'sample-client-app',
				},
			},
		],
	],
};
