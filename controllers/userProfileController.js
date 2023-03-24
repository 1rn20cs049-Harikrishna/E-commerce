const { JwtVerify } = require("./authentication/authHandler")
const { sequelize } = require("./../models/db");
const db = require("./../models/db");
const Sequelize = require('sequelize')


const checkProfile = async(req, res) => {
    if(JwtVerify(req.cookies.token)){
        UprofilePage()
        // res.render('userProfile')
        // console.log('im not cookie')
    }
    else{
        req.status(404).send('incorrect url parsed!')
    }
}

const UprofilePage = async(req, res) => {
    try{
        if(req.cookies.token === undefined){
            // res.status(307).redirect('/')
            res.redirect('/login')
        }else{
            let data = await JwtVerify(req.cookies.token)
            console.log(data)
           console.log("up")
        //    console.log(rreseq.cookies)
       
            // let user = await sequelize.query(`CREATE PROCEDURE find_user_details
            // AS
            //  select id from users where email = "${data.Email}" 
              
            // GO;
            
            
            
            // `)
            // console.log(user)

            let Uname = await sequelize.query(`select name from users where email = "${data.Email}"`,{ type: Sequelize.QueryTypes.SELECT })
            // console.log(Uname)
            Uname = Uname[0].name
            // console.log(Uname[0].name)


            let Uphone = await sequelize.query(`select mobile from users where email = "${data.Email}"`,{ type: Sequelize.QueryTypes.SELECT })
            // console.log(Uphone)
            Uphone =  Uphone[0].mobile
            let Uemail = data.Email

            let Uaddress = await sequelize.query(`select  landmark,district, state, pin from addresses where userId in(select id from users where email = "${data.Email} ") group by pin`,{ type: Sequelize.QueryTypes.SELECT } )
            console.log(Uaddress);
            // Uaddress =  Uaddress[0].address

            res.render("userProfile", { Uname, Uphone, Uemail, Uaddress});



        }
    }
    catch(e){
       // console.log(e.cookies)
        console.log(e.message)
    }
}

module.exports.UprofilePage = UprofilePage;
// exports.UprofilePage = UprofilePage;