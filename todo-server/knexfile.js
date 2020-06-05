// Update with your config settings.
require('dotenv').config();

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.SERVER_HOST,
			database: process.env.POSTGRES_DB,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
};
