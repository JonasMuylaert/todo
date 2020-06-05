const knex = require('../knex');
const { tableNames } = require('../../server/constants/constants');

const { todos } = tableNames;
module.exports = {
	async getTodos(endIndex) {
		const res = await knex
			.select(
				'todos.id',
				'todos.title',
				'todos.date_todo',
				'todos.urgency',
				'users.first_name',
				'users.last_name',
				'todos.done'
			)
			.from(todos)
			.join('users', 'todos.user_id', '=', 'users.id')
			.orderBy('title')
			.limit(endIndex);

		return res;
	},
};
