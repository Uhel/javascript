const neutrino = require('neutrino');

module.exports = (storybookBaseConfig) => {
	const config = neutrino().webpack();
	config.entry = storybookBaseConfig.entry;
	config.output = storybookBaseConfig.output;
	config.plugins = storybookBaseConfig.plugins;
	return config;
};
