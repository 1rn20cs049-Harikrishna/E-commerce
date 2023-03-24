const {Sequelize,DataTypes} = require('sequelize');
const {sequelize } = require('../config/dbConfig');


    const categoryModel = sequelize.define('category',{
       

        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
    cat :{
        allowNull: false,
         type: Sequelize.STRING,
    }

   
    

}
   , { timestamps:false,
 //raw: false //to avoid the createdAt  and UpdatedAt columns in a relation
    })

   
    module.exports.categoryModel = categoryModel;

