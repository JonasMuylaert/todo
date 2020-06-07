const express = require('express');
const { isAuth } = require('../../middlewares/isAuth');
const router = express.Router();

const listController = require('./listController');

router.get('/', isAuth, listController.getListsByName, listController.getLists);

router.post('/', isAuth, listController.addList);

router.delete('/', isAuth, listController.deleteList);

// router.put('/list', listController.updateList);

module.exports = router;
