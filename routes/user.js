const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.loadPage);

router.post('/signup', userController.signUpUser);

router.post('/login', userController.loginUser);

module.exports = router;