const csrf = (err,req,res,next) =>{ 
    if(err.code !== 'EBADCSRFTOKEN') return next(err)   //checking for cross site resource forgery
    res.status(403).send('CSRF attack detected')
  }

module.exports = csrf;