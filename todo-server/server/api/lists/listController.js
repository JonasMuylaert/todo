const List = require('./listModel');
const Todo = require('../todos/todoModel');
exports.getLists = async (req, res, next) => {
	const userId = req.user;
	try {
		const lists = await List.getLists(userId);
		res.status(200).json(lists);
	} catch (error) {
		next(new Error('List not foudn'));
	}
};

exports.getListsByName = async (req, res, next) => {
	const userId = req.user;
	const name = req.query.name;
	if (!name) return next();
	try {
		const lists = await List.getListByName(userId, name);
		res.status(200).json({
			message: 'found lists',
			lists: lists,
		});
	} catch (err) {
		next(new Error(err));
	}
};

exports.addList = async (req, res, next) => {
	const body = req.body;
	console.log(body);
	if (!body) {
		res.status(400);
		return next(new Error('No information supplied'));
	}
	//check if list for user already exists.
	const checkList = await List.getListByName(req.user, req.body.name);
	if (checkList) {
		res.status(400);
		return next(new Error('List already exists'));
	}
	//CREATE LIST
	const list = new List({
		...req.body,
		user_id: req.user,
	});
	try {
		const [addedList] = await list.addList();
		//req.body.todos => id of todo
		// addedList => id of list created
		//if todo selected, update and set it to list
		if (req.body.todos) {
			await Todo.updateTodo(req.body.todos, req.user, {
				list_id: addedList,
			});
		}
		res.status(200).json({
			message: 'List added',
		});
	} catch (error) {
		next(new Error('failed adding list'));
	}
};
