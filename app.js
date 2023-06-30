const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
var cors = require('cors');

const app = express();

app.use(cors());

app.set('views', 'views');

const userRoutes = require('./routes/user');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

sequelize.sync().then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));

