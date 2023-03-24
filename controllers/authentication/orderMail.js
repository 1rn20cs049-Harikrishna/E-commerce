"use strict";
const nodemailer = require("nodemailer");
// const db = require('../../models/db');
async function orderMail(Email) {
 

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



  //send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"harikrishn92364@gmail.com', // sender address
    to: Email, // list of receivers
    // to:'athreya1207@gmail.com',
    subject: "order Confirmation!", // Subject line
    text: "Authentication", // plain text body
    html: `<b style="font-family:'Roboto'">
    Your order has been confirmed 😎 <br />
     Our agent will contact you soon regarding further information <br /> 
     Further dipatch information and payment link will be sent through mail <br/>
     Thank You have a nice day
     <hr />
    
    `, // html body
                //remember later need to add a link which directly redirect to login page
  });



// db.mailModel.create({ email:Email})  // inserting just created account email and otp in mails realation

 console.log("Message sent: %s", info.messageId);
//  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

// --------> Record deletion <---------------
 // deleting the otp and email  from mails relation  after 5 min of insertion









// main('1rn20cs049.harikrishna@gmail.com')
// emailVerify('1rn20cs049.harikrishna@gmail.com',876583)
module.exports.orderMail = orderMail;
// module.exports.emailVerify = emailVerify;