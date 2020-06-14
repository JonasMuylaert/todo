const User = require('./userModel');

exports.getUserById = async (req, res, next) => {
	const userId = req.params.id;
	try {
		const user = await User.getUserById(userId);
		res.json({
			message: 'fetched user',
			user: user,
		});
	} catch (error) {
		next(new Error('failed getting user'));
	}
};
