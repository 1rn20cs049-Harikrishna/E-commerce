const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');


const mailModel =   sequelize.define('mail',{
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    otp:{
        type:DataTypes.BIGINT,
        allowNull:false
    }
});

module.exports.mailModel =  mailModel;