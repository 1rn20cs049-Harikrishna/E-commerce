const router = require('express').Router()
const {fetchProducts,particularProducts} =  require('../controllers/productController')
router.get('/:category/:productId',particularProducts)
// router.get('/:category',fetchProducts)


module.exports = router;