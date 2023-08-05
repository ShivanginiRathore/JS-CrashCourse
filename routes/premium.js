const express = require('express');

const premiumController = require('../controllers/premium');

const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.use('/premiumLeaderboard', premiumController.premiumLeaderboard);

module.exports = router;
