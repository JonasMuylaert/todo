const knex = require('../../../db/knex');
const { tableNames } = require('../../constants/constants');

module.exports = class List {
	constructor({ name, color, description, user_id }) {
		this.name = name;
		this.color = color;
		this.description = description;
		this.user_id = user_id;
	}
	static getLists(userId) {
		return knex(tableNames.lists).select().where('user_id', userId);
	}
	static getListByName(userId, name) {
		return knex(tableNames.lists)
			.select('name')
			.where('user_id', userId)
			.andWhere('name', name)
			.first();
	}
	addList() {
		return knex(tableNames.lists).insert(this).returning('id');
	}
	static deleteList(listId, userId) {
		return knex(tableNames.lists)
			.where('id', listId)
			.andWhere('user_id', userId)
			.del();
	}
};
