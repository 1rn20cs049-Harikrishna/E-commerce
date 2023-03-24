const { sequelize } = require('../models/db')
const {JwtVerify} = require('./authentication/authHandler')
const home = async (req,res) =>{

    try{
        console.log()
      
        if (req.cookies.token == undefined ){
            res.render('index')
            //  res.status(300).redirect('/login')
        } 
        else{ 
          let data = await JwtVerify(req.cookies.token)

          let name = await sequelize.query(`select name from users where email="${data.Email}"`)
               name =  name[0][0].name;
          console.log(name)
          res.render('index', {
             Name :name 
          })
        }
    } catch(e){
        console.log(e.message);
        console.log("im in home controller")
        res.render('index')
    }
    // res.send(`<h1>This is home page </h1>    
    // <a href="/login">To Login click me</a>
    // <br/>
    // <br />
    // <a href="/register">To Login create Account</a>
    // <br /> 
    // <br />
    // <br />
    //  <a href="/logout" > To logout  click here  </a>
    // `)

   



}

module.exports = home