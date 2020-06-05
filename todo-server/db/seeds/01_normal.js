const faker = require('faker');
const bcrypt = require('bcrypt');

const {
	tableNames,
	orderedTableNames,
} = require('../../server/constants/constants');

exports.seed = async knex => {
	// Deletes ALL existing entries
	await orderedTableNames.reduce(async (promise, tableName) => {
		await promise;
		return knex(tableName).del();
	}, Promise.resolve());
	// Inserts seed entries
	const passWord = 'admin';
	const user = {
		first_name: 'jonas',
		last_name: 'Muylaert',
		email: 'jonas.muylaert@live.com',
		password: await bcrypt.hash(passWord, 12),
	};

	const lists = {
		name: 'no-list',
	};

	const todos = {
		title: 'test',
		date_todo: new Date(),
		urgency: 'very-urgent',
		done: 0,
		description: 'testing db',
		user_id: 1,
	};

	const comments = {
		content: 'test comment',
		todo_id: 1,
		user_id: 1,
	};

	const createdUser = await knex(tableNames.users).insert(user);
	const createdList = await knex(tableNames.lists).insert(lists);
	const createdTodo = await knex(tableNames.todos).insert(todos);
	const createdComment = await knex(tableNames.comments).insert(comments);

	return [createdUser, createdList, createdTodo, createdComment];
};
