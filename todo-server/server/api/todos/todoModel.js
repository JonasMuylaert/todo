const knex = require('../../../db/knex');
const { tableNames } = require('../../constants/constants');

//TODO CRUD QUERIES

const { todos } = tableNames;

// GET ALL TODOS
module.exports = class Todos {
	constructor({ title, date_todo, urgency, description, list }) {
		this.title = title;
		this.date_todo = date_todo;
		this.urgency = urgency;
		this.description = description;
		this.list = list;
	}

	static async getTodos(page, limit) {
		const offset = (page - 1) * limit;
		/*
      stel limit = 50

      Pagina 1 => offset = 0; -> begint van 0
      Pagina 2 => ofset = 50; -> begint van 50

			Pagina 1 => 0 - 10;
			Pagina 2 => 0 - 20;

			startIndex = 0
			endIndex = Page * limit

    */
		// const res = await knex
		// 	.select(
		// 		'todos.id',
		// 		'todos.title',
		// 		'todos.date_todo',
		// 		'todos.urgency',
		// 		'users.first_name',
		// 		'users.last_name'
		// 	)
		// 	.from(todos)
		// 	.join('users', 'todos.user_id', '=', 'users.id')
		// 	.limit(limit)
		// 	.offset(offset);
		const endIndex = page * limit;
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
	}

	static async getTodo(id) {
		const res = await knex
			.select(
				'todos.title',
				'todos.date_todo',
				'todos.urgency',
				'todos.description',
				'users.first_name',
				'users.last_name'
			)
			.from(todos)
			.join('users', function () {
				this.on('users.id', 'todos.user_id').andOn('todos.id', parseInt(id));
			});
		return res;
	}

	static async searchTodo(title) {
		const res = await knex
			.select('title', 'date_todo', 'urgency')
			.from(todos)
			.where('title', 'like', `${title}%`);

		return res;
	}

	async addTodo() {
		if (this.list) {
			const [list_id] = await knex
				.select('id')
				.from(tableNames.lists)
				.where('name', this.list);
		}

		const res = await knex(tableNames.todos)
			.insert({
				title: this.title,
				date_todo: this.date_todo,
				urgency: this.urgency,
				description: this.description,
				list_id: this.list,
				user_id: 1,
			})
			.returning('*');
		try {
			return res;
		} catch (error) {
			console.log(err);
		}
	}

	static async deleteTodo(id) {
		const res = await knex(tableNames.todos).where('todos.id', id).del();

		return res;
	}

	static async updateTodo(id, body) {
		const res = await knex(tableNames.todos)
			.where('todos.id', '=', id)
			.update(body);
	}

	static async setDone(id, done) {
		const res = await knex(tableNames.todos)
			.where('todos.id', id)
			.update({ done: done });

		return res;
	}
};
