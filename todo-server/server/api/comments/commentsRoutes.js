const express = require('express');
const { isAuth } = require('../../middlewares/isAuth');
const router = express.Router();

const commentsController = require('./commentsController');

router.get('/:id', isAuth, commentsController.getComments);

router.post('/:id', isAuth, commentsController.addComment);

router.put('/:id', isAuth, commentsController.updateComment);

module.exports = router;
