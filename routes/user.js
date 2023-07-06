const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.loadPage);

router.post('/signup', userController.signUpUser);

module.exports = router;