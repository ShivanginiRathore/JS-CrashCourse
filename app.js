const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

var cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), 
    {flags:'a'}
);

// app.use(helmet());
// app.use(compression());
app.use(morgan('combined',{stream: accessLogStream}));
app.use(cors());
app.set('views', 'views');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const forgotpasswordRoutes = require('./routes/forgotpassword');


const Expense = require('./models/expense');
const User = require('./models/user');
const Order = require('./models/order');
const ForgotPasswordRequest = require('./models/forgotPasswordRequest');
const FileDownloaded = require('./models/fileDownloaded')

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use('/password',forgotpasswordRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

User.hasMany(FileDownloaded);
FileDownloaded.belongsTo(User);

const PORT = process.env.PORT;
console.log(PORT);

sequelize.sync().then(result => {
    app.listen(PORT);

})
.catch(err => console.log(err));

