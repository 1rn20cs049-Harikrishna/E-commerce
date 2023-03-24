const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');



    const cartModel = sequelize.define('cart',{
       

        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement:true
          },
          userId: {
            allowNull: false,          
            type: Sequelize.UUID,
           
          },
          Quantity: {          
            type: Sequelize.INTEGER,
            defaultValue: null
          },
          amount: {          
            type: Sequelize.INTEGER,
            defaultValue: null
          },
}
   , { timestamps:false,initialAutoIncrement: 2000,
 //raw: false //to avoid the createdAt  and UpdatedAt columns in a relation
})


   
    module.exports.cartModel = cartModel;

