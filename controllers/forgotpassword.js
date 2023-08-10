const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

const forgotPasswordRequest = require('../models/forgotPasswordRequest');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const Sib = require('@getbrevo/brevo');
const { where } = require('sequelize');
// const Sib = require('sib-api-v3-sdk');

const bcrypt = require('bcrypt');

const sequelize = require('../util/database');
require('dotenv').config()


exports.loadPage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','forgotpassword.html'));
}

exports.sendEmail = async (req, res, next) => {
    try{
        const email = req.body.email;
        const userId = req.user.id;

        const id = uuidv4();
        const mailContent = `http://localhost:3000/password/resetpassword/${id}`;

        const response = await req.user.createForgotPasswordRequest({id, isActive: true});

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;

        const tranEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: 'shivangini.atcs@gmail.com',
        }

        const receiver = [
            {
                email
            },
        ]
        
        await tranEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: 'Reset Password link',
            textContent: mailContent
        })

        res.status(201).json({message: 'success'});

    } catch (err){
        console.log(err);
        res.status(500).json({message: 'fail', Error : err});
    }

}

exports.resetPassword = async (req, res, next) => {
    try{
        const id = req.params.id;

        const request = await forgotPasswordRequest.findAll({where: {id:id}});
        const activeStatus = request[0].dataValues.isActive;

        if(activeStatus){
            await forgotPasswordRequest.update({isActive:false},{where:{id:id}})

            res.sendFile(path.join(rootDir,'views','resetPassword.html'));
        } else {
            res.status(500).json({message: 'fail', Error : 'Link is not active'});

        }

    } catch(err){
        console.log(err);
        res.status(500).json({message: 'fail', Error : err});
    }
}



exports.updatePassword = async (req, res, next) => {
    const t = await sequelize.transaction();
    try{
        const userId = req.user.id;
        const newPassword = req.body.password;
        
        bcrypt.hash(newPassword, 10, async (err, hash) => {
            console.log(err);
            await req.user.update({password: hash})
        })
         
        // await t.commit();
        res.status(201).json({message: 'success'});

    } catch(err){
        // await t.rollback();
        console.log(err);
        res.status(500).json({message: 'fail', Error : err});
    }
}
