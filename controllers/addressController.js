

const { sequelize } = require('./../models/db');

const {JwtVerify} = require('./authentication/authHandler')

const addressController = async (req,res) =>{
    if( req.query.deliveryAddress != 'undefined' && req.cookies.token != 'undefined'){
   console.log(req.query.deliveryAddress)
  // id	userId	Quantity	amount	
  
  try  {
   
    // console.log(data.email)
    if(req.cookies.token == undefined ){
      res.status(307).redirect('/login');
   } else{
    let data = await JwtVerify(req.cookies.token)
   console.log(data)
    
    console.log('im from address controller')
    let user = await sequelize.query(`select id from users where email="${data.Email}"`)
    console.log(user[0][0].id)
    console.log(req.body)
    let newAddress = await sequelize.query(`INSERT into addresses (userId,state,pin,district,landmark)values ('${user[0][0].id}','${req.body.state}','${req.body.pin}','${req.body.district}','${req.body.landmark}')`)
    // if(user) res.redirect('/login')
    // let cart = await sequelize.query(`select id from users where userId="${user[0][0].id}"`)
    // res.json({ 'update' : " address has been updated"})
    res.redirect('/userProfile')

    
   }

} catch(E){
     console.log(E.message)
}
    }  else{
        console.log('undefimed')
    }
}


exports.addressController = addressController