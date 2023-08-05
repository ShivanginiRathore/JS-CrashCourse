const { totalmem } = require('os');
const Expense = require('../models/expense');
const User = require('../models/user');
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
        const userId = req.user.id;
        const { amount, description, category } = req.body;
        
        if (amount == undefined || amount.length === 0 || description == undefined){
            res.status(404).json({message: 'Parameters are missing'});
        }
        // const expense = await Expense.create({amount, description, category, userId});
        const expense = await req.user.createExpense({amount, description, category});

        const user = await User.findAll({
            attributes:['total_amount'],
            where: {id: userId}
        })

        const prevAmount =  user[0].dataValues.total_amount;
        let totalAmount;
        if(prevAmount === null){
            totalAmount = amount;
        } else {
            totalAmount = prevAmount + amount;
        }

        const promise1 = await req.user.update({total_amount: totalAmount});
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