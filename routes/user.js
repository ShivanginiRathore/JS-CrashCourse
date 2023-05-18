const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/getUsers', userController.getAllUsers);

router.post('/', userController.addUserDetail);

module.exports = router;