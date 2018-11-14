require('dotenv').config();

module.exports = {
	use: [
		'@usertech/neutrino-preset-eslint-prettier',
		[
			'@neutrinojs/react',
			{
				html: {
					title: 'example-client',
					links: [
						{
							href: 'https://fonts.googleapis.com/css?family=Muli:400,700,800',
							rel: 'stylesheet',
						},
					],
				},
			},
		],
		[
			'@usertech/window-env/neutrino-preset',
			['GRAPHQL_API_URL', 'GRAPHQL_WS_URL', 'AUTH_CLIENT_ID', 'AUTH_DOMAIN', 'AUTH_AUDIENCE'],
		],
		(neutrino) => neutrino.config.resolve.modules.add(neutrino.options.source),
		(neutrino) => {
			neutrino.config.module.rules.delete('svg');
			neutrino.config.module
				.rule('reactSvg')
				.test(neutrino.regexFromExtensions(['svg']))
				.include.add(neutrino.options.source)
				.end()
				.use('reactSvg')
				.loader('svg-react-loader')
				.options({ name: 'Icon' });
		},
		'@usertech/neutrino-preset-graphql',
		'@usertech/neutrino-preset-react-storybook',
		[
			'@neutrinojs/env',
			['GRAPHQL_API_URL', 'GRAPHQL_WS_URL', 'AUTH_CLIENT_ID', 'AUTH_DOMAIN', 'AUTH_AUDIENCE'],
		],
	],
};
