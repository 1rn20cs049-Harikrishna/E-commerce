const router = require('express').Router()
const { registerPage,collectData,otpAuth ,otpVerification} = require('../controllers/signupController')


router
.get('/verify',otpAuth)
.post('/verify',otpVerification)
.get('/register',registerPage )
.post('/register',collectData)






module.exports = router;

