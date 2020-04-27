const Pool = require('pg').Pool;

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'TERcle27',
	database: 'pern_stack',
	port: 5432,
});

module.exports = pool;
