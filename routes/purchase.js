const express = require('express');

const purchaseController = require('../controllers/purchase');

const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/purchase', userAuthentication.authenticate, purchaseController.purchasePremium);

router.get('/updatetransactionstatus', userAuthentication.authenticate, purchaseController.updateTransactionStatus);

