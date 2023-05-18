const User = require('../models/user');
const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

exports.getUsers = (req, res, next) => {
    User.findAll()
    .then(products => {
        res.sendFile(path.join(rootDir,'views','index.html'));
        // res.json(products);
    })
    .catch(err => console.log(err));
}

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(products => {
        // console.log(products);
        res.json(products);
    })
    .catch(err => console.log(err));
}

exports.addUserDetail = (req, res, next) => {
    console.log("inside add user detail");
    console.log(req.body);

    const userName = req.body.name;
    const userEmail = req.body.email;
    const userNumber = req.body.phoneNumber;
    console.log(userName, userEmail, userNumber);

    User.create({
        name: userName,
        email: userEmail,
        phoneNumber: userNumber
    })
    .then(result => {
        console.log('Data Added Succesfully');
        res.json();
    })
    .catch(err => console.log(err));
}