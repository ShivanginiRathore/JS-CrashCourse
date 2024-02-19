const express = require('express');

const passwordController = require('../controllers/forgotPassword');
const userAuthentication = require('../middleware/auth');


const router = express.Router();

router.get('/forgotpassword', passwordController.loadPage);

router.post('/forgotpassword', passwordController.sendEmail);

router.get('/resetpassword/:id', passwordController.resetPassword);

router.post('/resetpassword', passwordController.updatePassword);

module.exports = router;