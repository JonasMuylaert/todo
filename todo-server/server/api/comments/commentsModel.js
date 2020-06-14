const knex = require('../../../db/knex');

const { tableNames } = require('../../constants/constants');

module.exports = class Coments {
	constructor(user_id, todo_id, content) {
		this.user_id = user_id;
		this.todo_id = todo_id;
		this.content = content;
	}
	static getComments(userId, todoId) {
		return knex(tableNames.comments)
			.select()
			.where('user_id', userId)
			.andWhere('todo_id', todoId);
	}

	addComment() {
		return knex(tableNames.comments).insert(this);
	}
	static updateComment(commentId, todoId, data) {
		return knex(tableNames.comments)
			.where('id', commentId)
			.andWhere('todo_id', todoId)
			.update(data);
	}
};
