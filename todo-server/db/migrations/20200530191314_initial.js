const { tableNames } = require('../../src/constants/constants');
const Knex = require('knex');

/**@param {Knex} knex*/

const defaultColumns = table => {
	table.timestamps(false, true);
	table.datetime('deleted_at');
};

const references = (table, column, referenceColumn) => {
	table.integer(column).unsigned();
	table.foreign(column).references(referenceColumn).onDelete('cascade');
};
exports.up = async function (knex) {
	await knex.schema.createTable(tableNames.users, table => {
		table.increments().notNullable();
		table.string('first_name', 46).notNullable();
		table.string('last_name', 46).notNullable();
		table.string('email', 62).unique().notNullable();
		table.string('password').notNullable();
		defaultColumns(table);
	});

	await knex.schema.createTable(tableNames.lists, table => {
		table.increments().notNullable();
		table.string('name').notNullable();
		references(table, 'user_id', 'users.id');
		defaultColumns(table);
	});

	await knex.schema.createTable(tableNames.todos, table => {
		table.increments().notNullable();
		table.string('title', 100).notNullable().unique();
		table.datetime('date_todo').notNullable();
		table.string('urgency', 20).notNullable();
		references(table, 'user_id', 'users.id');
		references(table, 'list_id', 'lists.id');
		table.text('content');
		defaultColumns(table);
	});

	await knex.schema.createTable(tableNames.comments, table => {
		table.increments().notNullable();
		table.text('content').notNullable();
		table.integer('likes');
		table.integer('dislikes');
		references(table, 'todo_id', 'todos.id');
		references(table, 'user_id', 'users.id');
		defaultColumns(table);
	});
};

exports.down = async function (knex) {
	//VOLGORDE!!
	await knex.schema.dropTable(tableNames.comments);
	await knex.schema.dropTable(tableNames.todos);
	await knex.schema.dropTable(tableNames.lists);
	await knex.schema.dropTable(tableNames.users);
};
