const express = require('express');

const expenseController = require('../controllers/expense');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/expense', expenseController.loadExpensePage);

router.get('/getExpenses',userAuthentication.authenticate, expenseController.getAllExpenses);

router.post('/expense',userAuthentication.authenticate, expenseController.addExpense);

router.use('/deleteExpense/:id', expenseController.deleteExpense);

module.exports = router;