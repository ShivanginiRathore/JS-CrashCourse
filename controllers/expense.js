const Expense = require('../models/expense');
const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

exports.loadExpensePage = (req, res, next) => {
    // res.redirect('localhost:3000/expense.html');
    console.log("inside load expense page")
    // return res.redirect('/expense');

    res.sendFile(path.join(rootDir,'views','expense.html'));
}

exports.getAllExpenses = async (req, res, next) => {
    
    try{
        const expenses = await Expense.findAll();
        res.json(expenses);
    }
    catch(err) {
        console.log(err)
    }
}

exports.addExpense = async (req, res, next) => {
    try{   
        const { amount, description, category } = req.body;
        await Expense.create({amount, description, category});
        res.json();
        }
    catch(err){
        console.log(err)
    }
}

exports.deleteExpense = (req, res, next) => {
    const userId = req.params.id;
    // console.log('user id is -------------------------', userId);
    // console.log('body is -------------------------', req.params);

    Expense.findByPk(userId)
    .then(expense => {
        expense.destroy();
    })
    .then(result => {
      console.log('Destroyed expense');
      res.json();
    })
    .catch(err => console.log(err));
}