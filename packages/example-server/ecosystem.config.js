const path = require('path');

module.exports = {
	apps: [
		{
			name: 'deploy schema',
			script: 'yarn prisma deploy --force && yarn prisma generate',
			watch: ['./datamodel.prisma'],
			autorestart: false,
		},
		{
			name: 'deploy seed data',
			script: 'bin/import.js',
			watch: ['./seed-data'],
			autorestart: false,
		},
		{
			name: 'API',
			script: 'src/index.ts',
			node_args: '-r tsconfig-paths/register --inspect=0.0.0.0:9230',

			// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
			autorestart: true,
			restart_delay: 2000,
			watch: [path.resolve(__dirname)],
			watchOptions: {
				usePolling: true,
			},
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development',
				DEBUG: 'recombee:*',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
