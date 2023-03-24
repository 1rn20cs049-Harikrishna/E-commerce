























require('dotenv').config();


//downloaded modules
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
// const session = require('express-session');
// const jwt = require('jsonwebtoken');
// const SessionStore = require('express-session-sequelize')(session.Store);
// const {Auth,LoginCredentials} = require('two-step-auth');
const path = require('path')


const app = express()

//middleware configuration
let corOptions = {
  oigin: '*' //'http://localhost:5000'
}

//secuirty
const csrfProtection = csrf({ cookie: { httpOnly: true } });
const csrfSecurityCheck = require('./controllers/security/csrf.js');

//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(csrfSecurityCheck)

//Establishing the session middle ware to store token on user side
// app.use(session({
//   // genid: function(req) {
//   //   return () // Note yet to set : use UUIDs for session IDs
//   // },
//   secret: process.env.SECRECT_KEY,
//    resave:false,
//    saveUninitialized:false,
//    cookie:{secure:false,maxAge:3600000,httpOnly:true}

// }));



// csrfProtection <--- use this in route to check the csrf

// const myDatabase = require('./models/db')
// const sequelizeSessionStore = new SessionStore({
//   db: myDatabase,
// });



//user routes
const forgot = require('./routes/forgot')

const notFound = require('./middleware/not-found')
const errMware = require('./middleware/error-handler')
// const dbConnection = require('./config/dbConfig')
const home = require('./routes/home')
const logout = require('./routes/logout')
const login = require('./routes/login')
const register = require('./routes/register')
const cart = require('./routes/cart')
const productRoute = require('./routes/productRoute')
const { fetchProducts, particularProducts } = require('./controllers/productController')
const { cartPage, deleteCartItem, AddToCart } = require('./controllers/cartController')
const { addressController } = require('./controllers/addressController')
const { addproduct, viewproduct } = require('./controllers/addproductController')
const { UprofilePage } = require('./controllers/userProfileController')
const { orders } = require('./controllers/orderController')

// const {forgotPage} = require('./controllers/forgotController')
// const {checkProfile} = require('./controllers/userProfileController')
// app.get('/userProfile',checkProfile)

// const {otpAuth,collectData }=  require('./controllers/signupController')

// const {JwtVerify} = require('./controllers/authentication/authHandler')

const J = require('./controllers/authentication/authHandler')
app.get('/z', csrfProtection, (req, res) => {
  // console.log(req.cookies)
  // res.cookie('hari','secondCookie',{httpOnly:true , maxAge:12000})
  // res.json({
  //   message:'hello from home'
  // })


  //     }) 
  //     res.json({
  //       t :payload
  //     })
  //   }
  // })
  // res.send(`<form action="/" method="post">
  // <input name='username' value='djgh' />
  // <input type="hidden" name="_csrf" value="${ req.csrfToken()}" />
  // <button>submit </button>
  // </form>`)
  // res.render('signup')

  console.log(J.JwtCreate())
  res.json({
    "try": "until diee"
  })


})


//
app.get('/userProfile', UprofilePage)
app.get('/orders', orders, (req, res) => {
  // res.sendFile('./payment.html')
  res.sendFile(path.join(__dirname + '/payment.html'));
})
// app.get('/payment' ,


//ADMIN
app.get('/admin', viewproduct);
app.post('/admin', addproduct)

app.use('/logout', logout)
// app.get('/forgot',(req,res) =>{
//   res.render('otpVerification')
// })
app.use('/login', login);

app.use('/', home)
// app.use('/login',login)
app.use('/', register)
app.use('/forgot', forgot)

// app.use('/add-to-cart',cart)
// app.get('/add-to-cart/',cartPage)
app.get('/cart-view', cartPage)

app.post('/add-to-cart', AddToCart)

app.get('/delete-product', deleteCartItem)

app.get('/add-to-cart/delete-product', deleteCartItem)
// app.use('/cart/',cart)


app.get('/:category/:productId', particularProducts)
// app.use('/',productRoute)
app.get('/:category', fetchProducts)



app.post('/getAddress', addressController)

// app.use('/',logout);
app.get('/trail', (req, res) => {
  console.log(req.cookies.token)
  res.send(req.cookie)
})

app.delete('/delete', (req, res) => {
  console.log('im from deletion');
  res.send('from delete router')
})


app.get('/protected', ensureToken, function (req, res) {
  res.send({
    "mode": "protected"
  })
  // if()
})

function ensureToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()
  } else {
    res.sendStatus(403)
  }
}




const start = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}
start()

