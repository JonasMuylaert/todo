const express = require('express');
const { isAuth } = require('../../middlewares/isAuth');
const router = express.Router();

const listController = require('./listController');

router.get('/', isAuth, listController.getListsByName, listController.getLists);

router.post('/', isAuth, listController.addList);

// router.post('/list', listController.removeList);

// router.put('/list', listController.updateList);

module.exports = router;
