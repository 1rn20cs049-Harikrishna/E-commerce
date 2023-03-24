const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');


    const orderModel = sequelize.define('order',{
       

        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
          },
    userId:{
        type: Sequelize.UUID,
        allowNull:false
    }, 
    productId:{
        type: Sequelize.UUID,
        allowNull:true
    },
    amount:{
        type: Sequelize.INTEGER,
        allowNull:false
    },

   
    

}
   , { timestamps:false,
 //raw: false //to avoid the createdAt  and UpdatedAt columns in a relation

    



    })

   
    module.exports.orderModel = orderModel;

