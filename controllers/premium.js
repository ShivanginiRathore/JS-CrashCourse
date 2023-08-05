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
// async function premiumLeaderboard(userId) {
//   try{
//     // const expenses = await Expense.findAll({group: userId});
//     const sumOfPricePerUser = await Expense.findAll({
//       where: {userId:userId},
//         attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'totalPrice']],
//         group: ['userId'],
        
//       });

//     // console.log("List is", sumOfPricePerUser);
//     return sumOfPricePerUser[0];  

// } catch(err) {
//     console.log(err);
// }
// }

// exports.findUserNameByExpenseUserId = async (req, res, next) => {
//     try {
//         // const userId = req.body.userId;
//         const users = await User.findAll();
//         const leaderboardData = {};
//         leaderboardData[1] = [2];
//         leaderboardData[2] = 2;


//         users.forEach(async user => {
//           console.log("user Id is>>>>>>>>>>>>>>>>>>>>>>>>.", user.id);
//           const price = await premiumLeaderboard(user.id);
//           console.log('Total Amount is >>>>>>>data values>>>>>>>', price.dataValues.totalPrice);
//           const obj = {
//             'name': user.name, 
//             'totalPrice': price.dataValues.totalPrice
//           }
//           leaderboardData[3] = [3];


//           // leaderboardData.push{userName: user.name, totalPrice: }
//         });
//         leaderboardData[4] = 4;

//           console.log('data >>>>>>>>>>>>>>', leaderboardData);


//         return res.status(201).json(leaderboardData);  

//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  