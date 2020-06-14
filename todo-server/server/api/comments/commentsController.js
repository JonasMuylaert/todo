const Comment = require('./commentsModel');

exports.getComments = async (req, res, next) => {
	const todoId = req.params.id;
	try {
		const comments = await Comment.getComments(req.user, todoId);
		res.json({
			message: 'fetched comments',
			comments: comments,
		});
	} catch (error) {
		res.status(400);
		next(new Error('failed getting comments'));
	}
};

exports.addComment = async (req, res, next) => {
	const content = req.body.content;
	const userId = req.user;
	const todoId = req.params.id;
	try {
		const comment = new Comment(userId, todoId, content);
		const addedComment = await comment.addComment();
		res.json({
			message: 'comment added',
			addedComment: addedComment,
		});
	} catch (error) {
		console.log(error);
		res.status(400);
		next(new Error('failed adding comment'));
	}
};

exports.updateComment = async (req, res, next) => {
	const commentId = req.body.commentId;
	const todoId = req.params.id;
	const data = req.body.data;

	try {
		const updatedComment = await Comment.updateComment(commentId, todoId, data);
		res.json({
			message: 'succesfully updated comment',
			comment: updatedComment,
		});
	} catch (error) {
		console.log(error);
		res.status(400);
		next(new Error('Failed updating comment'));
	}
};
