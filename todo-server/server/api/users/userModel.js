const knex = require('../../../db/knex');
const { tableNames } = require('../../constants/constants');
const { users } = tableNames;
module.exports = class User {
	constructor(id) {
		this.id = id;
	}
	static getUserById(id) {
		return knex(users).select().where('id', id);
	}
	static getUserByEmail(email) {
		return knex(users)
			.select()
			.where('email', email)
			.then(users => users[0]);
	}
	static create(user) {
		return knex(users)
			.insert(user)
			.returning('id')
			.then(ids => ids[0]);
	}
};
