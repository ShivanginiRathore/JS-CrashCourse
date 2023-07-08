const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/expense', expenseController.loadExpensePage);

router.get('/getExpenses', expenseController.getAllExpenses);

router.post('/expense', expenseController.addExpense);

module.exports = router;