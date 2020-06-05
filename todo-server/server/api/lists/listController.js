const List = require('./listModel');

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
