const express = require('express');
const router = express.Router();

const { isAuth } = require('../middlewares/isAuth');
const authController = require('./authController');

router.get('/is-verif', isAuth, authController.verifyAuth);

router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

module.exports = router;
