require('dotenv').config();
const yargs = require('yargs');
const path = require('path');
// const pwa = require('@neutrinojs/pwa');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { ProvidePlugin } = require('webpack');

const argv = yargs.argv;

module.exports = {
	use: [
		['./neutrino-preset-eslint-prettier', { enable: !argv.port }],
		[
			'@neutrinojs/react',
			{
				html: {
					template: require('html-webpack-template'),
					title: 'example-client',
					links: [
						{
							href: 'https://fonts.googleapis.com/css?family=Muli:400,700,800',
							rel: 'stylesheet',
						},
					],
				},
				babel: {
					plugins: [
						['babel-plugin-styled-components', { fileName: false }],
						['babel-plugin-lodash', { id: 'lodash' }],
					],
					presets: ['@babel/preset-typescript'],
				},
			},
		],
		[
			'@usertech/window-env/neutrino-preset',
			['GRAPHQL_API_URL', 'GRAPHQL_WS_URL', 'AUTH_CLIENT_ID', 'AUTH_DOMAIN', 'AUTH_AUDIENCE'],
		],
		(neutrino) => {
			neutrino.config.module.rule('compile').test(/\.(js|jsx|vue|mjs|ts|tsx)$/);
			neutrino.config.resolve.extensions.add('.ts');
			neutrino.config.resolve.extensions.add('.tsx');

			neutrino.config.resolve.modules.add(path.resolve(neutrino.options.source, 'modules'));
			neutrino.config.resolve.modules.add(neutrino.options.source);
			neutrino.config.resolve.modules.add(path.resolve('node_modules'));

			neutrino.config.resolveLoader.modules.add(path.resolve('node_modules'));

			neutrino.config.module.rule('compile').include.add(path.resolve('stories'));

			neutrino.config.output.publicPath('/');

			neutrino.config.plugin('rjv-provide').use(ProvidePlugin, [
				{
					Json: 'react-json-view',
				},
			]);

			if (argv.analyze) {
				neutrino.config.plugin('analyze').use(BundleAnalyzerPlugin);
			}
		},
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
	],
};
