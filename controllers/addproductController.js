const { sequelize } = require('./../models/db');
const db = require('./../models/db');

const viewproduct = async (req,res)=>{
    res.render('AdminProduct')
}

const addproduct = async (req,res)=>{
    console.log(req.body);
    let id =  Math.floor((Math.random() * 100) + 1);
    let {productname,productdescription,category,mrp,price,packsize} = req.body;
  
    if (productname !== '' &&  packsize != '' &&  productdescription !==  '' && category !== '' && mrp !==  '' && price != '' && productdescription !== '' ){
            // let result = await sequelize.query(`INSERT INTO datasets (name,category,pack_size,mrp,price,description) VALUES ('${productname}', ${category} ,${packsize},${mrp},${price}, '${productdescription}')`)
    // console.log(result)
    res.send('Product Added...!')
    // res.json({"message":"addproduct getting data"})
    } else{
        res.send('fill out properly')
    }
  
}

exports.viewproduct  = viewproduct;
exports.addproduct  = addproduct;