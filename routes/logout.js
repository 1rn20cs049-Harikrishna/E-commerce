const express = require('express');

const route = express.Router();

route.get('/',(req,res) =>{
   
    // req.session.destroy(err =>{
        res.clearCookie('token').redirect('/')
    // })
});
module.exports = route;