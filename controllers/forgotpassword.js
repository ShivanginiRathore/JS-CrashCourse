const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);

const forgotPasswordRequest = require('../models/forgotPasswordRequest');
const { v4: uuidv4 } = require('uuid');

const Sib = require('sib-api-v3-sdk')
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
        
        console.log('receiver email is content is>>>>>>>>>>>>>>>>>>', email)
        
        await tranEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: 'Reset Password link',
            textContent: 'reset your password'
        })

        res.status(201).json({message: 'success'});

    } catch (err){
        console.log(err);
        res.status(500).json({message: 'fail', Error : err});

    }

}
