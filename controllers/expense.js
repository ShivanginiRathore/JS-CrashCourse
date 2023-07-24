const Expense = require('../models/expense');
const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

exports.loadExpensePage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','expense.html'));
}

exports.getAllExpenses = async (req, res, next) => {
    try{
        const userId = req.user.id;
        // const expenses = req.user.getExpenses()   >>>>>>> Shorter query
        const expenses = await Expense.findAll({where: {userId: userId}});
        res.json(expenses);
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({error: err, success: false})
    }
}

exports.addExpense = async (req, res, next) => {
    try{   
        const { amount, description, category } = req.body;

        if (amount == undefined || amount.length === 0 || description == undefined){
            res.status(404).json({message: 'Parameters are missing'});
        }
        // const expense = await Expense.create({amount, description, category, userId});
        const expense = await req.user.createExpense({amount, description, category})
        res.status(201).json({expense});

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