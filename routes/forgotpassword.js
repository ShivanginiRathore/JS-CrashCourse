const express = require('express');

const passwordController = require('../controllers/forgotpassword');
const userAuthentication = require('../middleware/auth');


const router = express.Router();

router.get('/forgotpassword', passwordController.loadPage);

router.post('/forgotpassword',userAuthentication.authenticate, passwordController.sendEmail);

router.post('/forgotpassword',userAuthentication.authenticate, passwordController.sendEmail);

router.post('/resetpassword',userAuthentication.authenticate, passwordController.updatePassword);

router.use('/resetpassword/:id', passwordController.resetPassword);

module.exports = router;