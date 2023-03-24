const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');


    const addressModel = sequelize.define('address',{
       

        userId: {
            allowNull: false,          
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    pin:{
        type:DataTypes.INTEGER,
        allowNull:false
    }, 
    district:{
        type:DataTypes.STRING,
        allowNull:false
    },   
     landmark:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
   
    

}
   , { timestamps:false,
 //raw: false //to avoid the createdAt  and UpdatedAt columns in a relation
    })

   
    module.exports.addressModel = addressModel;

