const {sequelize } = require('../config/dbConfig');



let graphdata = async () =>{
    try{
        let result= await  sequelize.query('select category , count(*) as total from datasets  group by category ')

        console.log(result)
    }
       catch(e){
        console.log('failed to collect')
       }
}
graphdata()

// const graph =   sequelize.define('mail',{
//     email:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     otp:{
//         type:DataTypes.BIGINT,
//         allowNull:false
//     }
// });

// module.exports.mailModel =  mailModel;