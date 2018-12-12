const deepmerge = require('deepmerge');
const eslint = require('@neutrinojs/eslint');

const prettierrc = (prettierOptions = {}) => () => {
	return deepmerge(
		{
			printWidth: 100,
			parser: 'typescript',
			useTabs: true,
			singleQuote: true,
			trailingComma: 'all',
			arrowParens: 'always',
		},
		prettierOptions,
	);
};

module.exports = (
	neutrino,
	{ enable = true, eslint: eslintOptions = {}, prettier: prettierOptions = {} } = {},
) => {
	const defaultOptions = {
		failOnError: process.env.NODE_ENV !== 'development',
		cwd: neutrino.options.root,
		useEslintrc: false,
		baseConfig: {
			extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
		},
		plugins: ['prettier'],
		// envs: ['es6'],
		parserOptions: {
			ecmaVersion: 2018,
			sourceType: 'module',
		},
		globals: ['process', 'window', 'document', 'navigator', 'console', 'fetch', 'module'],
		rules: {
			'prettier/prettier': ['error', {}],
			'react/prop-types': 0,
		},
	};

	const mergedOptions = deepmerge(defaultOptions, eslintOptions);

	// do not lint when running devserver

	if (enable) {
		neutrino.use(eslint, {
			test: neutrino.regexFromExtensions(),
			include: [neutrino.options.source, neutrino.options.tests],
			exclude: [],
			eslint: mergedOptions,
		});
	}
	neutrino.register(
		'prettierrc',
		prettierrc(prettierOptions),
		'Return an object of accumulated Prettier configuration suitable for use by .prettierrc.js',
	);
};
