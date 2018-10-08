module.exports = {
	apps: [
		{
			name: 'deploy schema',
			script: 'prisma deploy --force && prisma generate',
			watch: ['./datamodel.prisma'],
			autorestart: false,
		},
		{
			name: 'API',
			script: 'src/index.js',

			// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
			instances: 1,
			autorestart: true,
			restart_delay: 2000,
			watch: ['./src'],
			watchOptions: {
				usePolling: true,
			},
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
