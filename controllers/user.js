const { log } = require('console');
const User = require('../models/user');
const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

exports.loadPage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','login.html'));
}

exports.signUpUser = async (req, res, next) => {
try{
    
    const { name, email, password } = req.body;
    if(name == undefined || name.length === 0 
        || email == undefined || email.length === 0
        || password == undefined || password.length === 0){
        return res.status(400).json({err: "Bad parameters"});
    }
    await User.create({name, email, password})
    
        res.status(201).json({message: 'Successfully created new user'});
}
    catch(err){
         res.status(500).json(err);
    }
}

exports.loginUser = async (req, res, next) => {
try{
    const { email, password } = req.body;

    const details = await User.findAll({
        where: {
          email: email
        }
      })
      console.log(details);
      if (details.length > 0){
        if(details[0].password === password){
            res.status(200).json({message: 'Successfully logged in'});
        }
        else {
            res.status(205).json({message: 'incorrect password'});
        }
      } else {
        res.status(206).json({message: 'User not exists! Check your email Id or Signup'});
      } 
}
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
