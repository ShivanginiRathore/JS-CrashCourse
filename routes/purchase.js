const express = require('express');

const purchaseController = require('../controllers/purchase');

const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.use('/purchasePremium', userAuthentication.authenticate, purchaseController.purchasePremium);

router.use('/updatetransactionstatus', userAuthentication.authenticate, purchaseController.updateTransactionStatus);


module.exports = router;
