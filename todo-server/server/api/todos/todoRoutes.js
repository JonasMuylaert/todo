const express = require('express');
const router = express.Router();

const todoController = require('./todoController');

/* GET ALL TODOS */
// /api/v1/?page=&limit=
router.get('/', todoController.getTodos);
/* GET TODO */
// /api/v1/:id
router.get('/:id', todoController.getTodo);
/*DELETE TODO */
router.delete('/delete/:id', todoController.delTodo);
/*PUT TODO */
router.put('/update/:id', todoController.updateTodo);
router.put('/done/:id', todoController.updateDone);
/*POST TODO */
router.post('/add', todoController.addTodo);

module.exports = router;
