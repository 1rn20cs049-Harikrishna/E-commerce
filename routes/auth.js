
const {JwtCreate} = require('../controllers/authentication/authHandler')

const JwtAuth = (req,res,next) =>{
  JwtCreate
    next()
}
module.exports = JwtAuth;