const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const mongoose = require('mongoose')

var cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), 
    {flags:'a'}
);


app.use(morgan('combined',{stream: accessLogStream}));
app.use(cors());
app.set('views', 'views');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const forgotpasswordRoutes = require('./routes/forgotpassword');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use('/password',forgotpasswordRoutes);

const PORT = process.env.PORT;

mongoose
  .connect(
    'mongodb+srv://shivanginiatcs:Mongodb123@cluster0.ufuvak9.mongodb.net/expense'
  )
  .then(result => {
    app.listen(3000, () => {
        console.log('Server is running')
    });
  })
  .catch(err => {
    console.log(err);
  });
