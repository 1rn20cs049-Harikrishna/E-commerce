const jwt = require('jsonwebtoken')
let t;
 async function CreateJWTtoken (payload){
    const secret = 'india is a rich in heritage';
    const options = {
        "algorithm":"HS256", //Alg is default , mentioning  is optional
     }
    

    try{
         t =  jwt.sign(payload,secret,options)
        //  function callback(error,token){
        //     if(error) throw new Error('failed to create')         //For Async 
        //     else{
        //     //    t.push(token)
        //         console.log(token)
        //     }
        return t
        
      
    }catch(error){
        console.log(error)
    }
   


 }



 async function JwtVerify (token){
     let  sec = 'india is a rich in heritage';
     let validity ;
    try{
        validity =  jwt.verify(token,sec)
                // function callback(err,auth){
                //     if(err) throw new Error ('failed during authentication')
                //     else{
                //           console.log(auth)
                //     }

                return validity;
     }catch(err){
             console.log(err.message)
             console.log('in valid token')
            
            }
          
                


 }

 
module.exports.CreateJWTtoken =  CreateJWTtoken
module.exports.JwtVerify = JwtVerify
