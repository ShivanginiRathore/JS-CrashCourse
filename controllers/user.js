const { log } = require('console');
const User = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');
const rootDir = path.dirname(process.mainModule.filename);

exports.loadPage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','login.html'));
}

exports.loadSignUpPage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','signup.html'));
}

exports.signUpUser = async (req, res, next) => {
try{
    
    const { name, email, password } = req.body;
    if(name == undefined || name.length === 0 
        || email == undefined || email.length === 0
        || password == undefined || password.length === 0){
        return res.status(400).json({err: "Bad parameters"});
    }
// salt rounds = 10
    bcrypt.hash(password, 10, async (err, hash) => {
        console.log(err);
        await User.create({name, email, password: hash})
        res.status(201).json({message: 'Successfully created new user'});
    })
    
}
    catch(err){
         res.status(500).json(err);
    }
}

exports.loginUser = async (req, res, next) => {
try{
    const { email, password } = req.body;

    const user = await User.findAll({
        where: {
          email: email
        }
      })
      if (user.length > 0){
        bcrypt.compare(password, user[0].password, (err, result) => {
            if(err){
                throw new Error('Something went wrong');
            }
            if(result === true){
                res.sendFile(path.join(rootDir,'views','expense.html'));
                // res.status(200).json({message: 'Successfully logged in'});
                // return res.redirect('/expense');

            } else {
                res.status(401).json({message: 'Incorrect password'});
            }
        })        
      } else {
        res.status(404).json({message: 'User not exists! Check your email Id or Signup'});
      } 
}
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
