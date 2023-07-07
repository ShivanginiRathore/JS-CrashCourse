const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/login', userController.loadPage);

router.post('/signup', userController.signUpUser);

router.get('/signup', userController.loadSignUpPage);

router.post('/login', userController.loginUser);

module.exports = router;