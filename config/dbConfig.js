
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
   'mydb',   //DATABASE
   'root',   //USERNAME
   '',       //PASSWORD
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('DB Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});


module.exports.sequelize =  sequelize ;



