const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');


    const cartProductModel = sequelize.define('cart_product',{
       

        
          cartId: {
            allowNull: false,          
            type: Sequelize.UUID,
          
          },

          productId: {
            allowNull: false,          
            type: Sequelize.UUID
          },
          Quantity: {          
            type: Sequelize.INTEGER,
            defaultValue:1
          },
          
        

  
    

}
   , { timestamps:false,
 //raw: false //to avoid the createdAt  and UpdatedAt columns in a relation

    



    })

   
    module.exports.cartProductModel = cartProductModel;

