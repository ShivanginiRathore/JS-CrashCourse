const Razorpay = require('razorpay');
const Order = require('../models/order');

exports.purchasePremium = (req, res, next) => {
    try{
        var rzp = new Razorpay({
            key_id: 'rzp_test_ZoPygMOjeMUhwT',
            key_secret: 'hUBmAIE0gKaCNxxqc5d4Eqtb'
        })

        const amount = 2500;

        rzp.orders.create({amount, currency:'INR'}, async (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }

            await req.user.createOrder({orderid: order.id, status: 'PENDING'});

            return res.status(201).json({order, key_id : rzp.key_id});

        }) 
    } catch(err){
       console.log(err);
       res.status(401).json({message: 'Something went wrong', error:err})     
    }
}

exports.updateTransactionStatus = async (req, res, next) => {
    try{
        const {payment_id, order_id} = req.body;
        const order = await Order.findOne({where: {orderid : order_id}});
        
        const promise1 = order.update({paymentid: payment_id, status: 'SUCCESSFUL'});
        const promise2 = req.user.update({ispremiumuser: true});
        // await Promise.all(promise1, promise2);

        Promise.all([promise1, promise2]).then(() => {
            return res.status(202).json({success: true, message: 'Transaction successful'});
        }).catch(err => {
            console.log(err);
        });
    
    } catch(err) {
        console.log(err);
       res.status(401).json({message: 'Something went wrong', error:err}) 
    }
}

