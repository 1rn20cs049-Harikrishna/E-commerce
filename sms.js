var messagebird = require('messagebird')('6uYhEnc00Pg1hxzRgKhLgLzvu');

    var params = {
      'originator': 'TestMessage',
      'recipients': [
        9019740027
    ],
      'body': 'This is a test message'
    };

    messagebird.verify.verify(params, function (err, response) {
      if (err) {
        return console.log(err);
      }
      console.log(response);
    });