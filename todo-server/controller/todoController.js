const express = require('express');
const Todo = require('../model/todoModel');
const pool = require('../util/db');

//get all TODOS
exports.getTodos = async (req, res, next) => {
	try {
		const { rows } = await pool.query('SELECT * FROM todo');
		res.json(rows);
	} catch (err) {
		console.log(err.message);
	}
};
//get a todo
exports.getTodo = async (req, res, next) => {
	try {
		const todoId = req.params.id;
		const todo = await Todo.findTodoById(todoId);
		res.json(todo);
	} catch (err) {
		console.log(err.message);
	}
};
//create todo
exports.postCreateTodo = async (req, res, next) => {
	try {
		const { description } = req.body;
		const newTodo = new Todo(
			'test',
			'test',
			description,
			'2020-04-27',
			'very-urgent'
		);
		newTodo.save();
		res.json(newTodo);
	} catch (err) {
		console.log(err.message);
	}
};

//update TODO
exports.postUpdateTodo = async (req, res, next) => {};

//delete todo
