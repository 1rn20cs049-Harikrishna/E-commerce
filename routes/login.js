const router = require('express').Router();
const {collectLoginData,loginForm,otpCheckPage} = require('../controllers/loginController')
router
.get('/',loginForm)
.post('/', collectLoginData)
.get('/otpCheck',otpCheckPage)


module.exports = router;