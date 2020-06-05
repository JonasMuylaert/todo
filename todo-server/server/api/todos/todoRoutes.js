const express = require('express');
const router = express.Router();

const todoController = require('./todoController');

const { isAuth } = require('../../middlewares/isAuth');
/* GET ALL TODOS */
// /api/todos/
router.get('/', todoController.getTodoByList, todoController.getTodos);
/* GET TODO */
// /api/todos/?list=
// /api/todos/:id
router.get('/:id', todoController.getTodoById);
/*DELETE TODO */
router.delete('/delete/:id', isAuth, todoController.delTodo);
/*PUT TODO */
router.put('/update/:id', isAuth, todoController.updateTodo);
/*POST TODO */
router.post('/add', isAuth, todoController.addTodo);

module.exports = router;
