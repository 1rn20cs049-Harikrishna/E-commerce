// const sequelize = require("../models/db");
// const {Op} = require('sequelize')

// const { SignUp } = require('../models/db');
const db = require('../models/signUpModel')
const {main,emailVerify}= require('./authentication/RegisterMail')
const bcrypt = require('bcrypt');
const dab = require('./../models/db');
const saltRounds = 10;
let payload = '';
const {CreateJWTtoken,JwtVerify} = require('./authentication/authHandler')

//GET Register
const registerPage = async (req,res,next)=>{
    res.render('register')
}
const otpAuth = async (req,res,next) =>{
    res.render('emailVerification')
}

//POST Register
const collectData = async (req,res,next)=>{

  //req.body should not be undefined
if(req.body !== undefined){
    const {Username,num,email,password} = req.body;
   //  const Check = await db.SignUp.findAll({ attributes: ['name','email'] ,where: {email:email } })
   payload = {email,password}
    //checking the existing of user in records
     db.SignUp.findAll({ attributes: ['name','email'] ,where: {email:email } })
          .then((exist) =>{  
               if(exist.length === 0){      
                bcrypt.hash(password, saltRounds, function(err, hash) {             
            
              if(err){
                    console.log('failed to encrypt')
                }
                let hasedPassword = hash

                db.SignUp.create({       
                    name: Username,
                    mobile: num,
                    email: email,
                    password:hasedPassword,
                }).then((response) => {
                        //  console.log(response)
                         CreateJWTtoken(payload)
                         .then( (token) =>{
                            main(email); //sending mail to user 
                             console.log(token) 
                            //  document.cookie("cookieToken",token)
                            res.status(200).cookie('token',token).send('Account created successfully')
                             
                         })
                          .catch( (error) =>{
                            console.log('failed to create jwt token')
                          })                        
                       //  CreateJWTtoken(Username)                            
                }).catch((error) => {
                                console.error('Failed to create a new record : ', error);
                });        
            });
          
    }
    else{
    res.status(403).send('User exists with same credentials')
}
})  
}}
  


const otpVerification = (req,res,next) =>{
    if(req.body !== undefined){
    let verfication_code = req.body.verfication_code
   
    const emailVerify = (Email,otp) =>{
 
        dab.mailModel.findOne({
         attributes:['otp'],
         where:{
           email:Email,
           otp:otp
         }
       })
       .then((exist) =>{
         if(exist ){
           console.log('true')
           res.status(200).redirect('/')
          //  json('verified successfully')
         
         }else{
           console.log('false')
           res.send('failed to verify')
         }
       })
       .catch ((err) =>{
         console.log(err)
       })

    }

    let data = JwtVerify(req.cookies.token)
    data.then(d => {
      emailVerify(d.email,verfication_code)
    })
    .catch((err) =>{
 console.log('failed to verify jwt')
    })
    
    
}

else{
    console.log('provide input')
}
    }
   
 

// main('1rn20cs049.harikrishna@gmail.com')
module.exports.registerPage = registerPage;
module.exports.collectData = collectData;
module.exports.otpAuth = otpAuth;
module.exports.otpVerification = otpVerification;

//only exports can be written






// let options = {
//   maxAge: 1000 * 60 * 15, // would expire after 15 minutes
//   httpOnly: true, // The cookie only accessible by the web server
//   signed: true // Indicates if the cookie should be signed
// }