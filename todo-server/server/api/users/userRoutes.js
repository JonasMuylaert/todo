const express = require('express');
const { isAuth } = require('../../middlewares/isAuth');
const router = express.Router();

const userController = require('./userController');

router.get('/:id', isAuth);

// router.put('/list', listController.updateList);

module.exports = router;
