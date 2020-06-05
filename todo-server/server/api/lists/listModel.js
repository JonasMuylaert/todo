const knex = require('../../../db/knex');
const { tableNames } = require('../../constants/constants');

module.exports = class List {
	static getLists(userId) {
		return knex(tableNames.lists).select().where('user_id', userId);
	}
	static getListByName(userId, name) {
		return knex(tableNames.lists)
			.select('name')
			.where('user_id', userId)
			.andWhere('name', name);
	}
};
