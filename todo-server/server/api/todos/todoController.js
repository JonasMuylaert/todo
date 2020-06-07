const Todo = require('./todoModel');

exports.getTodos = async (req, res, next) => {
	const limit = parseInt(req.query.limit);
	const page = parseInt(req.query.page);
	const title = req.query.title;
	if (!title) {
		try {
			const todos = await Todo.getTodos(page, limit);
			res.status(200).json(todos);
		} catch (error) {
			next(new Error(error, 'failed to fetch todos'));
		}
	} else if (title) {
		try {
			const todos = await Todo.searchTodo(title);
			res.status(200).json(todos);
		} catch (error) {
			next(new Error(error, 'failed to fetch todos'));
		}
	}
};
exports.getTodoByList = async (req, res, next) => {
	if (!req.query.list) return next();
	const list = req.query.list;
	try {
		const todos = await Todo.getTodoByList(list);
		res.status(200).json({
			message: 'jaah',
			todos: todos,
		});
	} catch (error) {
		res.status(500);
		next(new Error(error));
	}
};
exports.getTodoById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const todo = await Todo.getTodoById(id);
		res.json(todo);
	} catch (error) {
		console.log(error);
		next(new Error('Error getting todo'));
	}
};

exports.addTodo = async (req, res, next) => {
	const todo = new Todo({
		...req.body,
		user_id: req.user,
		list_id: req.body.list_id ? req.body.list_id : 1,
	});
	try {
		const result = await todo.add();
		res.status(201).json(result);
	} catch (error) {
		res.status(500);
		next(new Error('Error adding todo'));
	}
};

exports.delTodo = async (req, res, next) => {
	const id = req.params.id;
	const userId = req.user;
	try {
		const delTodo = await Todo.deleteTodo(id, userId);
		res.json({
			message: 'Item deleted',
			todo: delTodo,
		});
	} catch (error) {
		next(new Error('Error deleting todo'));
	}
};

exports.updateTodo = async (req, res, next) => {
	const id = req.params.id;
	const userId = req.user;
	req.body.updated_at = new Date();
	const body = req.body;
	try {
		const updatedTodo = await Todo.updateTodo(id, userId, body);
		res.status(202).json({
			message: 'Item updated',
			todo: updatedTodo,
		});
	} catch (error) {
		console.log(error);
		res.status(500);
		next(new Error('Error updating todo'));
	}
};
