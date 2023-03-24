const {JwtVerify} = require('./authentication/authHandler')
const {orderMail}= require('./authentication/orderMail')
const orders = async (req,res,next) =>{
    try{
      console.log()
    
      if (req.cookies.token == undefined ){
           res.status(300).redirect('/login')
      } 
      else{
        let data = await JwtVerify(req.cookies.token)
        // console.log(data)
        // console.log(data.Email)
        orderMail(data.Email)
        // orderMail('athreya1207@gmail.com')

        // res.send("im in orders");
        next()
    
      }
     
    } catch(e){
        console.log(e.message)
      console.log("i can't order")
    }
   
  }

  module.exports.orders = orders;