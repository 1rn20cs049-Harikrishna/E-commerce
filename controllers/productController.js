const { sequelize } = require('./../models/db');
const db = require('./../models/db');


const fetchProducts = async ( req,res , next) =>{

let { category} = req.params;
// console.log(category)   

// fetching page limit and offset 

if( category !=  'favicon.ico'  &&  (category == 'personal-care' || category == 'medicine'  || category == 'child-care' || category == 'health-nutrition' ) ){
let offset = 0;
let {page} = req.query; 

if(page != undefined){
  console.log(page)

  if(page == 1) {
    offset = 0; 
  }
  else if(page == 2){
    offset = 40;
  }
   else if(page == 3){
    offset = 80;
   } else if( page == 4 ){
    offset = 120;
   }else if( page == 5 ){
    offset = 160;
   }
    else{
    offset = 0;
   }
  }



        try{          

            let result =  await sequelize.query(`
           select *  from datasets where category IN ( SELECT id from categories  where cat="${category}" ) limit 40 offset ${offset}`)

           if(result[0].length == 0){
            res.send(`No product with id ${category}`)
          }else{
             res.render('products',{
                cat:category,
                // product_id:result[0].id
                result
             })
            }
           

         } catch(err){
             console.log(err)
         }
        } else{
          if ( category == 'add-to-cart') {
            // res.redirect('/add-to-cart')
            res.send("i")
          } else{
            console.log('im out fetch products')
            return next()

          }
         
        }
      
      }
   




const particularProducts = async ( req,res,next) =>{

if(req.params.productId != undefined  && req.params.productId != 'delete-product'){
  let p_id =  req.params.productId
    try{
      
         let result = await db.ProductModel.findAll({           
             where:{
                id: req.params.productId
             }
         })
         let products =  await sequelize.query(`
         select *  from datasets limit 40 offset 0`)

         let catNo = await  sequelize.query(`
         select category  from datasets where id=${p_id}`);

       

         let CAT = await sequelize.query(`
         select cat from categories where id = "${catNo[0][0].category}"`)

        //  let l = {CAT}
         console.log(CAT[0][0].cat)
        //  CAT =  CAT[0][0].cat

 
      if(result == 0 || products == 0){
        res.send(`No product with id ${req.params.productId}`)
      } else{
        res.render('particularProduct',{ category :CAT,result,products})
      }
      
       
   
     } catch(err){
         console.log(err)
     }
} 
else{
    // res.send('i didnt recieved')
   return  next();
}

}




const particularProducts2 = async ( req,res,next) =>{

  if(req.params.productId != undefined  && req.params.productId != 'delete-product'){
    let p_id =  req.params.productId
      try{
        
           let result = await db.ProductModel.findAll({           
               where:{
                  id: req.params.productId
               }
           })
           let products =  await sequelize.query(`
           select *  from datasets limit 40 offset 0`)
  
           let catNo = await  sequelize.query(`
           select category  from datasets where id=${p_id}`);
  
         
  
           let CAT = await sequelize.query(`
           select cat from categories where id = "${catNo[0][0].category}"`)
  
          //  let l = {CAT}
           console.log(CAT[0][0].cat)
          //  CAT =  CAT[0][0].cat
  
   
        if(result == 0 || products == 0){
          res.send(`No product with id ${req.params.productId}`)
        } else{
          res.render('particularProduct',{ category :CAT,result,products})
        }
        
         
     
       } catch(err){
           console.log(err)
       }
  } 
  else{
      // res.send('i didnt recieved')
     return  next();
  }
  
  }
exports.fetchProducts =fetchProducts;
exports.particularProducts = particularProducts;
exports.particularProducts2 = particularProducts2;