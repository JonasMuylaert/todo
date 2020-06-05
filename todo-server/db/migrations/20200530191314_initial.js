const { tableNames } = require('../../server/constants/constants');
const Knex = require('knex');

/**@param {Knex} knex*/

const defaultColumns = table => {
	table.timestamps(false, true);
	table.datetime('deleted_at'); //soft deletes ? nog niet zeker;
};

const references = (table, column, referenceColumn) => {
	table.integer(column).unsigned().notNullable();
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

	//ALTIJD LIJST met ID 1 SEEDEN!!! ANDERS BREAK
	await knex.schema.createTable(tableNames.lists, table => {
		table.increments('id').notNullable();
		table.string('name').notNullable();
		table.string('color', 10);
		table.string('description', 255);
		table.integer('user_id').unsigned();
		table.foreign('user_id').references('users.id').onDelete('cascade'); //LIST MAG van user zijn MOET NIET
		defaultColumns(table);
	});

	await knex.schema.createTable(tableNames.todos, table => {
		table.increments().notNullable();
		table.string('title', 100).notNullable().unique();
		table.datetime('date_todo').notNullable();
		table.string('urgency', 20).notNullable();
		table.integer('done').defaultTo(0);
		table.text('description');
		//ALTIJD LIJST met ID 1 SEEDEN!!! ANDERS BREAK
		table.integer('list_id').notNullable().unsigned().defaultTo(1); //1 is voor todos zonder list!! => default naar 1 maar mag ook geen 0 zijn, problemen bij opvragen;
		table.foreign('list_id').references('lists.id').onDelete('cascade');
		references(table, 'user_id', 'users.id'); // todo MOET van user zijn
		defaultColumns(table);
	});

	await knex.schema.createTable(tableNames.comments, table => {
		table.increments().notNullable();
		table.text('content').notNullable();
		table.integer('likes').defaultTo(0).notNullable();
		table.integer('dislikes').defaultTo(0).notNullable();
		references(table, 'todo_id', 'todos.id'); //comment MOET bij todo horen;
		references(table, 'user_id', 'users.id'); //comment MOET van user zijn;
		defaultColumns(table);
	});
};

exports.down = async function (knex) {
	await Promise.all(
		[
			tableNames.comments,
			tableNames.todos,
			tableNames.lists,
			tableNames.users,
		].map(tableName => knex.schema.dropTable(tableName))
	);
};
