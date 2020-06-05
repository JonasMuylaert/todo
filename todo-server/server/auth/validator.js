const Joi = require('@hapi/joi');

exports.validateSignup = user => {
	//Not empty + string
	const schema = Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string(),
		email: Joi.string().email().required(),
		reemail: Joi.ref('email'),
		password: Joi.string().pattern(
			new RegExp('(?=(.*[A-Z]){2})(?=(.*\\d){2})^\\D\\w{6,}') //min 6 characters 2 digits must not start with digit has 2 Uppercase letters
		),
		repassword: Joi.ref('password'),
	});
	const valid = schema.validate(user);
	return valid;
};

exports.validateLogin = user => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().pattern(
			new RegExp('(?=(.*[A-Z]){2})(?=(.*\\d){2})^\\D\\w{6,}') //min 6 characters 2 digits must not start with digit has 2 Uppercase letters
		),
	});

	const valid = schema.validate(user);
	return valid;
};
