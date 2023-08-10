const { totalmem } = require('os');
const Expense = require('../models/expense');
const User = require('../models/user');
const path = require('path');
const sequelize = require('../util/database');
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
        const t = await sequelize.transaction();

        const { amount, description, category } = req.body;
        
        if (amount == undefined || amount.length === 0 || description == undefined){
            res.status(404).json({message: 'Parameters are missing'});
        }
        // const expense = await Expense.create({amount, description, category, userId});
        const expense = await req.user.createExpense({amount, description, category}, {transaction: t});

        const totalAmount = Number(req.user.totalAmount) + Number(amount);

        await req.user.update({totalAmount: totalAmount},{transaction: t});
        await t.commit();
        res.status(201).json({expense});

        }
    catch(err){
        await t.rollback();
        console.log(err);
        return res.status(500).json({success: false, error: err});
    }
}

exports.deleteExpense = async (req, res, next) => {
    try{
        const t = await sequelize.transaction();
        const expenseId = req.params.id;
        const userId = req.user.id;

        if(expenseId == undefined || expenseId.length === 0){
            return res.status(400).json({success: false})
        }
        const expense = await Expense.findAll({where: {id : expenseId, userId : userId}});
        const resultRows = await Expense.destroy({where: {id : expenseId, userId : userId}},{transaction: t})

        if(resultRows === 0){
            return res.status(404).json({success: false, message: 'Expense doesnt belongs to the user'});
        }
        const totalAmount = Number(req.user.totalAmount) - Number(expense[0].dataValues.amount);

        await req.user.update({totalAmount: totalAmount},{transaction: t});
        await t.commit();

        return res.status(200).json({success: true, message: 'Deleted successfully'});

    } catch(err){
        await t.rollback();
        console.log(err);
        return res.status(500).json({success: false, message: 'Failed'});

    }
}