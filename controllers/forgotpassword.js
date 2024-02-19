const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

const ForgotPasswordRequest = require('../models/forgot-password-request');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const Sib = require('@getbrevo/brevo');
const { where } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../util/database');
require('dotenv').config()


exports.loadPage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','forgotPassword.html'));
}

exports.sendEmail = async (req, res, next) => {
    try{
        const email = req.body.email;
        const userResponse = await User.findOne({email: email});

        if(userResponse){        
            const id = uuidv4();
            const mailContent = `${process.env.WEBSITE}/password/resetpassword/${id}`;

            const forgotPassword = new ForgotPasswordRequest({
                uuid: id,
                isActive: true,
                userId: userResponse._id
            })

            const saveForgotPassword = await forgotPassword.save();
        
            // const response = await req.user.createForgotPasswordRequest({id, isActive: true});

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
    }

        res.status(201).json({message: 'success'});

    } catch (err){
        console.log(err);
        res.status(500).json({message: 'fail', Error : err});
    }

}

exports.resetPassword = async (req, res, next) => {
    try{
        const id = req.params.id;

        const request = await ForgotPasswordRequest.find({uuid: id});
        
        console.log(request)
        if(request){
            const activeStatus = request[0].isActive;
            if(activeStatus){
                await ForgotPasswordRequest.findOneAndUpdate({uuid:id},{isActive:false})
                res.sendFile(path.join(rootDir,'views','resetPassword.html'));

            } else {
                res.status(500).json({message: 'fail', Error : 'Link is not active'});
            }
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
        const newPassword = req.body.password;
        const uuid = req.body.uuid;
        
        bcrypt.hash(newPassword, 10, async (err, hash) => {
            console.log(err);
            const forgotPasswordRequest = await ForgotPasswordRequest.findOne({uuid: uuid});

            if(forgotPasswordRequest){
                const response = await User.findOneAndUpdate({_id: forgotPasswordRequest.userId},{password: hash});

                return res.status(201).json({message: 'success'});

            } else {
                res.status(401).json({message: 'Forgot password request not found'});
            }
        })
        

    } catch(err){
        console.log(err);
        res.status(500).json({message: 'fail', Error : err});
    }
}
