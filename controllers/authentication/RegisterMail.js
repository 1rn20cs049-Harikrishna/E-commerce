"use strict";
const nodemailer = require("nodemailer");
const db = require('../../models/db');
async function main(Email) {
 

  // Setting the credentials to use  SMTP transport for mail 
  let transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,//for 465, false for other ports
    service:'gmail',
    auth: {
      user: "harikrishna92364@gmail.com", // generated ethereal user
      pass: "mwjfdvrdjgwxgnij", // generated ethereal password
    },
  });

  let otp =   Math.floor(100000 + Math.random() * 900000); // 6 digit otp creation 


  //send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"harikrishn92364@gmail.com', // sender address
    to: Email, // list of receivers
    subject: "Registration verification ✔", // Subject line
    text: "Authentication", // plain text body
    html: `<b style="font-family:'Roboto'">To authenticate, please use the following One Time Password(OTP):
    <br /> <h3>${ otp }</h3>  <br />
    </b>
    Don't share this OTP with anyone. <br /> we hope to see you again soon ❤️
    
    `, // html body
                //remember later need to add a link which directly redirect to login page
  });



db.mailModel.create({ email:Email, otp})  // inserting just created account email and otp in mails realation

 console.log("Message sent: %s", info.messageId);
 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

// --------> Record deletion <---------------
let d = async ()=>{
  const inter = setTimeout(deleteRecord,1200)
      function deleteRecord(){
            db.mailModel.destroy({
                    where: {},
                  truncate: true //removing a record after 5 min
  })
}
clearTimeout(inter) //clearing interval  which is created just above
}
d() // deleting the otp and email  from mails relation  after 5 min of insertion









const emailVerify = (Email,otp) =>{
 
     db.mailModel.findOne({
      attributes:['otp'],
      where:{
        email:Email,
        otp:otp
      }
    })
    .then((exist) =>{
      if(exist ){
        console.log('true')
      
      }else{
        console.log('false')
      }
    })
    .catch ((err) =>{
      console.log(err)
    })
    
   


}

// main('1rn20cs049.harikrishna@gmail.com')
// emailVerify('1rn20cs049.harikrishna@gmail.com',876583)
module.exports.main = main;
module.exports.emailVerify = emailVerify;