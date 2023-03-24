const express = require('express')
const route = express.Router()

const  {forgotPage,updatePassword} = require('../controllers/forgotController')
route 
.get('/',forgotPage)
.post('/',updatePassword)

module.exports = route ;