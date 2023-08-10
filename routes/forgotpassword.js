const express = require('express');

const passwordController = require('../controllers/forgotpassword');
const userAuthentication = require('../middleware/auth');


const router = express.Router();

router.get('/forgotpassword', passwordController.loadPage);

router.post('/forgotpassword',userAuthentication.authenticate, passwordController.sendEmail);

module.exports = router;