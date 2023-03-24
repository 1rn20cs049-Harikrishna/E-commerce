const express = require('express')
const route = express.Router()
const  {cartPage,deleteCartItem} = require('../controllers/cartController')

route
.get('/add-to-cart/?p_id',cartPage)
// .delete('/delete-product/d_id?',deleteCartItem)
module.exports = route;