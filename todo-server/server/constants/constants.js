const tableNames = {
	users: 'users',
	lists: 'lists',
	todos: 'todos',
	comments: 'comments',
};

const orderedTableNames = [
	tableNames.comments,
	tableNames.todos,
	tableNames.lists,
	tableNames.users,
];

module.exports = {
	tableNames,
	orderedTableNames,
};
