const Todo = require('./todoModel');

exports.getTodos = async (req, res) => {
	const limit = parseInt(req.query.limit);
	const page = parseInt(req.query.page);
	const title = req.query.title;

	if (!title) {
		//limit = number
		//page = number
		//title = undefined
		const todos = await Todo.getTodos(page, limit);
		res.status(200).json(todos);
	} else if (title) {
		/*
			limit = Nan,
			page = Nan,
			title = string
		*/
		const todos = await Todo.searchTodo(title);
		res.status(200).json(todos);
	}
};

exports.getTodo = async (req, res) => {
	const id = req.params.id;

	const todo = await Todo.getTodo(id);

	res.status(200).json(todo);
};

exports.addTodo = async (req, res) => {
	console.log(req.body);
	const todo = new Todo({
		title: req.body.title,
		date_todo: req.body.date_todo,
		urgency: req.body.urgency,
		description: req.body.description,
		list: null,
	});
	try {
		const result = await todo.addTodo();
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.delTodo = async (req, res) => {
	const id = req.params.id;

	try {
		const delTodo = await Todo.deleteTodo(id);
		res.json({
			message: 'Item deleted',
			todo: delTodo,
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.updateTodo = async (req, res, next) => {
	const id = req.params.id;
	console.log(id);
	const body = req.body;

	if (!body) {
		next();
	}
	try {
		const updatedTodo = await Todo.updateTodo(id, body);
		res.json({
			message: 'Item updated',
			todo: updatedTodo,
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.updateDone = async (req, res) => {
	const id = req.params.id;
	const done = req.query.done;

	const result = await Todo.setDone(id, done);

	res.json(result);
};
