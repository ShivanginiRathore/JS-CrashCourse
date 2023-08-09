const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);
const Sib = require('sib-api-v3-sdk')
require('dotenv').config()


exports.loadPage = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','forgotpassword.html'));
}

exports.sendEmail = async (req, res, next) => {
    try{
        const email = req.body.email;
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.API_KEY

        const tranEmailApi = new Sib.TransactionalEmailsApi();;

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
            textContent:'Click on the below link to reset your password'
        })
        res.status(201).json();

    } catch (err){
        res.status(500).json({success: 'false', Error : err});

    }

}
