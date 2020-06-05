const knex = require('../../../db/knex');
const { tableNames } = require('../../constants/constants');

const User = require('../users/userModel');
//TODO CRUD QUERIES

const { todos } = tableNames;

// GET ALL TODOS
module.exports = class Todos extends User {
	constructor({ title, date_todo, urgency, description, user_id, list_id }) {
		super();
		this.title = title;
		this.date_todo = date_todo;
		this.urgency = urgency;
		this.description = description;
		this.list_id = list_id;
		this.user_id = user_id;
	}
	static getTodos(page, limit, list) {
		/*
      stel limit = 50

      Pagina 1 => offset = 0; -> begint van 0
      Pagina 2 => ofset = 50; -> begint van 50

			Pagina 1 => 0 - 10;
			Pagina 2 => 0 - 20;

			startIndex = 0
			endIndex = Page * limit
*/
		const endIndex = page * limit;
		return knex
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
	}
	static getTodoByList(list) {
		return knex(todos).select('title', 'id').where('list_id', list);
	}
	static getTodoById(id) {
		return knex
			.select(
				'todos.title',
				'todos.date_todo',
				'todos.urgency',
				'todos.description',
				'users.first_name',
				'users.last_name',
				'lists.name'
			)
			.from(todos)
			.join('users', function () {
				this.on('users.id', 'todos.user_id').andOn('todos.id', parseInt(id));
			})
			.join('lists', function () {
				this.on('lists.id', 'todos.list_id');
			});
	}

	static searchTodo(title) {
		return knex
			.select('title', 'date_todo', 'urgency')
			.from(todos)
			.where('title', 'like', `${title}%`);
	}

	add() {
		console.log(this.list_id);
		return knex(tableNames.todos)
			.insert({
				title: this.title,
				date_todo: this.date_todo,
				urgency: this.urgency,
				description: this.description,
				list_id: this.list_id,
				user_id: this.user_id,
				created_at: new Date(),
			})
			.returning('*');
	}

	static deleteTodo(id, userId) {
		return knex(tableNames.todos)
			.where('todos.id', id)
			.andWhere('user_id', userId)
			.del();
	}

	static updateTodo(id, userId, body) {
		return knex(tableNames.todos)
			.where('todos.id', '=', id)
			.andWhere('user_id', userId)
			.update(body);
	}
};
