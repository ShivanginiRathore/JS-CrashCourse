const Expense = require('../models/expense');
const sequelize = require('sequelize');
const User = require('../models/user');

exports.premiumLeaderboard = async (req, res, next) => {
    try{

      const leaderboardofUsers = await User.findAll({
        order: [['totalAmount', 'DESC']]
      })
        
        return res.status(201).json(leaderboardofUsers);  

    } catch(err) {
        console.log(err);
    }
}