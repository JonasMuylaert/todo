const notFound = (req, res, next) => {
	const error = new Error(`Address ${req.originalUrl} was not found`);
	res.status(404);
	next(error);
};

const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode === '200' ? '500' : res.statusCode;
	res.json({
		message: error.message,
		stack: process.env.SERVER_ENV === 'production' ? 'nice try' : error.stack,
		statusCode: statusCode,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
