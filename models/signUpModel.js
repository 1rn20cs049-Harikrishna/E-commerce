const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');

    const SignUp = sequelize.define('user',{  
      id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    mobile:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,        
        allowNull:true
    },
    updatedAt:{ 
        type:DataTypes.DATE,        
        allowNull:true
    },
})

module.exports.SignUp = SignUp;