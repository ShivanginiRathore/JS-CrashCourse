const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const { IoTRoboRunner } = require('aws-sdk');

const FileDownloaded = sequelize.define('fileDownloaded', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING
    }
});

module.exports = FileDownloaded;