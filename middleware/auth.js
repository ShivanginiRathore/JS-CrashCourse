const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    try{
        const token = req.header('Authorization');
        // console.log(token);
        const userObj = jwt.verify(token, 'longtoken');
        // console.log("USER ID >>>>>>>>>>>>",userObj.userId)
        const user = await User.findByPk(userObj.userId);
        // console.log(JSON.stringify(user));
        req.user = user;
        next();

    } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
    }

}
