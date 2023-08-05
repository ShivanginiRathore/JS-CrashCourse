const Expense = require('../models/expense');
const sequelize = require('sequelize');
const User = require('../models/user');

exports.premiumLeaderboard = async (req, res, next) => {
    try{

      const leaderboardofUsers = await User.findAll({
        attributes: ['id', 'name', [sequelize.fn('SUM', sequelize.col('amount')), 'totalPrice']],
        include: [
          {
            model: Expense,
            attributes:[]
          }
        ], 
        group: ['user.id'],
        order: [['totalPrice', 'DESC']]
      })
        
        return res.status(201).json(leaderboardofUsers);  

    } catch(err) {
        console.log(err);
    }
}