const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');

    const ProductModel = sequelize.define('dataset',{ 
    id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },   
    category:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    pack_size:{
        type:DataTypes.INTEGER,
        allowNull:true
    },  
    mrp:{
        type:DataTypes.INTEGER,
        allowNull:false
     }, 
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
     },   
     description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
},{ timestamps:false,  //to avoid the createdAt  and UpdatedAt columns in a relation
})

   
    module.exports.ProductModel = ProductModel;

