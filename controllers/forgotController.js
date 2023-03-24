const { Sequelize } = require("sequelize")
const { sequelize } = require("../models/db")
const bcrypt = require('bcrypt');

const forgotPage = (req,res) =>{
         res.render('forgot')
       
}

const updatePassword = async (req,res) =>{
    console.log(req.body.email)
    try{
        if ( (req.body.email).length  >= 10 ){
            let result = await sequelize.query(` 
            
            SELECT  id from users where email = "${req.body.email}" `, { type: Sequelize.QueryTypes.SELECT })
           
           if( result[0] === undefined) {
            res.status(405).send('No User with Given credentials')
           } else{

            if(req.body.password !==  req.body.conformpassword ){
                res.status(405).send('Both password should be same')

            }
            else if( (req.body.password).length  <  6 ){
                res.status(405).send('Password must be more  6 character ')

            }
            
            
            else{

            let hash = await bcrypt.hash(req.body.password,10);
            // console.log(hash)
                
                let update = await sequelize.query(`UPDATE users SET password = "${hash}" where id = "${result[0].id }"`)


                res.send('password updated successfully')
 
            }
            // console.log(result[0])
          console.log(req.body)
           
           }
           
            
    
        }
        else{
            res.send('Enter Email ')
        }

    } catch(e) {
        console.log('in forgot page')
        res.status(500).send("Un caught Error")
    }

   

   
}

module.exports.forgotPage = forgotPage;
module.exports.updatePassword = updatePassword;