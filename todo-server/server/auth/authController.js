const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validateSignup, validateLogin } = require('./validator');

const User = require('../api/users/userModel');

exports.postSignup = async (req, res, next) => {
	const { error } = validateSignup(req.body);
	if (!error) {
		const userEmail = await User.getUserByEmail(req.body.email);
		if (userEmail) {
			//email is in use
			res.status(400);
			return next(new Error('Email in use'));
		}
		//hash password
		const hashedPassword = await bcrypt.hash(req.body.password, 12);
		const user = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: hashedPassword,
			created_at: new Date(),
		};
		//insert user in db
		const userId = await User.create(user);
		if (userId) {
			//redirect
			res.status(200).json({
				message: `User with ${userId} ID has been created`,
			});
		}
	} else {
		res.status(400);
		const errorMessage = error.details[0].path[0];
		next(new Error(`${errorMessage} is wrong, check validation specs`));
	}
};

exports.postLogin = async (req, res, next) => {
	const { error } = validateLogin(req.body);
	if (!error) {
		//Find user
		const user = await User.getUserByEmail(req.body.email);
		if (user) {
			//Compare password
			const passwordMatch = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (passwordMatch) {
				const token = jwt.sign(
					{
						id: user.id,
					},
					process.env.SECRET_TOKEN,
					{ expiresIn: '1h' }
				);
				return res.json({
					message: 'Logged in',
					token: token,
				});
			}
			res.status(400);
			next(new Error('Inavlid email or password!'));
		}
		res.status(400);
		next(new Error('Invalid User!'));
	} else {
		res.status(400);
		next(new Error('Invalid user!'));
	}
};

exports.verifyAuth = (req, res, next) => {
	try {
		res.status(200).json(true);
	} catch (err) {
		next(new Error('Un Auth'));
	}
};
