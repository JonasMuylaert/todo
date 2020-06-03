const environment = process.env.SERVER_ENV || 'development';
const config = require('../knexfile')[environment];
module.exports = require('knex')(config);
