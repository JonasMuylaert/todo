const express = require('express');
const todoController = require('../controller/todoController');

const router = express.Router();
//get todo
router.get('/:id', todoController.getTodo);
//get todos
router.get('/', todoController.getTodos);
//post todo
router.post('/', todoController.postCreateTodo);

module.exports = router;
