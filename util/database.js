const Sequelize = require('sequelize');

const sequelize = new Sequelize('self-project','root','root@123',{
    dialect: 'mysql', 
    host:'localhost',
    port: '3001'
});

module.exports = sequelize;