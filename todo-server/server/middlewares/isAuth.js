const jwt = require('jsonwebtoken');

const User = require('../api/users/userModel');

exports.isAuth = (req, res, next) => {
	try {
		const token = req.header('Authorization');

		if (!token) {
			res.status(401);
			return next(new Error('Un-authorized'));
		}
		const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);

		req.user = verifiedToken.id;

		next();
	} catch (error) {
		res.status(500);
		next(new Error(error));
	}
};
