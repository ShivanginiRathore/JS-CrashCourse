const { log } = require('console');
const User = require('../models/user');
const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

exports.loadPage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','index.html'));
}

exports.signUpUser = async (req, res, next) => {
    // console.log("in sign up ------- ");
try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // const { name, email, password } = req.body;
    // console.log(name, email, password);
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
