const {
	createRandomUsers,
	createRandomLists,
	createRandomTodos,
	createRandomComments,
} = require('../randomDataGenerator');

const {
	orderedTableNames,
	tableNames,
} = require('../../server/constants/constants');

exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await orderedTableNames.reduce(async (promise, tableName) => {
		await promise;
		return knex(tableName).del();
	}, Promise.resolve());

	const users = await createRandomUsers(20);
	const lists = createRandomLists({
		amount: 5,
		maxUserId: 20,
	});
	const todos = createRandomTodos({
		amount: 20,
		maxListId: 5,
		maxUserId: 20,
	});

	const comments = createRandomComments({
		amount: 20,
		maxTodoId: 20,
		maxUserId: 20,
	});
	const createdUsers = await knex(tableNames.users)
		.insert(users)
		.returning('*');

	const createdLists = await knex(tableNames.lists)
		.insert(lists)
		.returning('*');

	const createdTodos = await knex(tableNames.todos)
		.insert(todos)
		.returning('*');

	const createdComments = await knex(tableNames.comments)
		.insert(comments)
		.returning('*');

	console.log('Users created: ', {
		createdUsers,
		createdLists,
		createdTodos,
		createdComments,
	});
};
