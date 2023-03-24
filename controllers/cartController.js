
const { sequelize } = require('./../models/db');
const db = require('./../models/db');
const {JwtVerify} = require('./authentication/authHandler')


// const cartView  = async (req,res) =>{
//   res.send("IM cart page")
// }


const cartPage = async (req,res) =>{
  if(req.cookies.token != 'undefined'){
 


try  {

  if(req.cookies.token == undefined ){
    res.status(307).redirect('/login');
 } else{
 let data = await JwtVerify(req.cookies.token) 

  let user = await sequelize.query(`select id from users where email="${data.Email}"`)
  console.log(user[0][0].id)
  
  let cart = await sequelize.query(`select id from carts where userId="${user[0][0].id}"`)
  let result = await sequelize.query(`select d.*,sum(cp.Quantity) as ind_total from datasets d  inner join cart_products cp on  d.id = cp.productId  where cp.cartId =${cart[0][0].id} group by cp.productId`)
 
  // console.log(result[0][0])
  let amount  =  await sequelize.query(`SELECT Quantity,amount from carts where id= ${cart[0][0].id}`);
  
  let total_quantity = amount[0][0].Quantity
  let total_price =  amount[0][0].amount
  // console.log(total_quantity)
  res.render('cart', { result,total_price,total_quantity })
 }
}
  catch(e){
    console.log(e.message)
  
  }
  
  } 
  else{
    console.log('im in cart page') 
      
    res.status(200).render('cart')

  }     
  
  
}







const deleteCartItem  =async  (req,res)=>{
  try{
    console.log(req.query.p_id)
    // add-to-cart/delete-product
    console.log('from delete')
    let data = await JwtVerify(req.cookies.token)
  let user = await sequelize.query(`select id from users where email="${data.Email}"`)
  console.log(user[0][0].id)
 
  let cart = await sequelize.query(`select id from carts where userId="${user[0][0].id}"`) 
   
   let query = `DELETE FROM cart_products WHERE productId = ${req.query.p_id} LIMIT 1`
   let result = await sequelize.query(query);
   let result1 = await sequelize.query(`select sum(d.price) as total_price,sum(Quantity) as total_quantity from datasets d  inner join cart_products cp on  d.id = cp.productId  where cp.cartId =${cart[0][0].id} `)

   // console.log(result[0][0].total_price)
   // console.log(result[0][0].total_quantity)
   let update  = await sequelize.query(`UPDATE carts set Quantity = ${result1[0][0].total_quantity} ,  amount = ${result1[0][0].total_price} where id = "${cart[0][0].id}" `); 
  
   console.log(result)
  //  console.log(update)
  //  console.log(url.URL)
    res.redirect('/cart-view')

    // res.send('sdjhdksjhkdsjhksdjhgj')
  } catch(e){
    console.log(e.message)
    console.log("failed to delete")
  }
  
  // res.json({"message" :"successfull directed"})
  //  res.render('cart',{
  //   'result':"result"
  //  })
}



let k = async() =>{
 
}

// k()


//**********************/*/*/*/*/*/** */ */

const AddToCart = async (req,res) =>{

  

try  {
 
  // console.log(data.email)
  if(req.cookies.token == undefined ){
    res.status(307).redirect('/login');
 } else{


  // console.log(req.body)
  const {quantity,id } = req.body
   let data = await JwtVerify(req.cookies.token)
  let user = await sequelize.query(`select id from users where email="${data.Email}"`)
  console.log(user[0][0].id)
 
  let cart = await sequelize.query(`select id from carts where userId="${user[0][0].id}"`) 
  let ADD_to_CART = await sequelize.query(`INSERT INTO cart_products (cartId,productId,Quantity) values (${cart[0][0].id}, ${id}, ${quantity})`) 
   let result = await sequelize.query(`select sum(d.price) as total_price,sum(Quantity) as total_quantity from datasets d  inner join cart_products cp on  d.id = cp.productId  where cp.cartId =${cart[0][0].id} `)

  // console.log(result[0][0].total_price)
  // console.log(result[0][0].total_quantity)
  let update  = await sequelize.query(`UPDATE carts set Quantity = ${result[0][0].total_quantity} ,  amount = ${result[0][0].total_price} where id = "${cart[0][0].id}" `); 
 
  // res.render('cart', { result,total_price,total_quantity })
  // res.send("cart Added")
  res.redirect('/cart-view')

 }
  
 }
  catch(e){
    console.log(e.message)
  }  
}




exports.cartPage = cartPage;
exports.deleteCartItem  = deleteCartItem;
exports.AddToCart = AddToCart
