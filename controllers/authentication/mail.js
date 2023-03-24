var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harikrishna92364@gmail.com',
    pass: 'ykvoyjhsknangbjy'
  }
});

var mailOptions = {
  from: 'harikrishna92364@gmail.com',
  to: '1rn20cs049.harikrishna@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = transporter;