const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user')

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

            const newOrder = new Order({
                orderId: order.id,
                status: 'PENDING',
                userId: req.user
            })
            const order1 = await newOrder.save()

            // await req.user.createOrder({orderid: order.id, status: 'PENDING'});

            return res.status(201).json({order1, key_id : rzp.key_id});

        }) 
    } catch(err){
       console.log(err);
       res.status(401).json({message: 'Something went wrong', error:err})     
    }
}

exports.updateTransactionStatus = async (req, res, next) => {
    try{
        const {payment_id, order_id} = req.body;

        // console.log(`payment id>>>> ${payment_id}, order is>>>>>.... ${order_id}`)

        const filter = { orderId: order_id };
        const update = {paymentId: payment_id, status: 'SUCCESSFUL'}
        
        const promise1 = Order.findOneAndUpdate(filter, update);
        
        const filter2 = { _id: req.user };
        const update2 = {isPremiumUser: true};
        const promise2 = User.findOneAndUpdate(filter2, update2);
        
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

