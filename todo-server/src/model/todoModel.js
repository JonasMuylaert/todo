const pool = require('../util/db');

module.exports = class Todo {
	constructor(title, list, description, date, urgency) {
		this.title = title;
		this.list = list;
		this.description = description;
		this.date = date;
		this.urgency = urgency;
	}

	async save() {
		const todos = await pool.query(
			'INSERT INTO todo (title,list,description,date,urgency) VALUES ($1,$2,$3,$4,$5) RETURNING *',
			[this.title, this.list, this.description, this.date, this.urgency]
		);
		return todos;
	}
	static async findTodoById(id) {
		const todo = await pool.query(
			'SELECT (title,date,urgency) FROM todo WHERE todo_id = $1',
			[id]
		);
		const { rows } = todo;
		return rows;
	}

	static async findTodoByDate(date) {
		const todos = await pool.query(
			'SELECT (title,date,urgency) FROM todo WHERE date = $1',
			[date]
		);
		const { rows } = todo;
		return rows;
	}
};
