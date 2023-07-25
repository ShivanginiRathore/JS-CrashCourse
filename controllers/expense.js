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

exports.deleteExpense = async (req, res, next) => {
    try{
        const expenseId = req.params.id;
        const userId = req.user.id;

        if(expenseId == undefined || expenseId.length === 0){
            return res.status(400).json({success: false})
        }

        const resultRows = await Expense.destroy({where: {id : expenseId, userId : userId}})
        if(resultRows === 0){
            return res.status(404).json({success: false, message: 'Expense doesnt belongs to the user'});
        }
        
        return res.status(200).json({success: true, message: 'Deleted successfully'});

    } catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: 'Failed'});

    }
}