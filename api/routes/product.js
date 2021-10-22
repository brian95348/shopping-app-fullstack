const router = require('express').Router()
const {verifyTokenAndAdmin} = require('../verifyToken')
const {getAllProducts,getProduct,
        createProduct,updateProduct,deleteProduct} = require('../views/product')

//router.route('/').get().post()
//create product
router.post('/add',verifyTokenAndAdmin,createProduct)

//update product
router.put('/:id',verifyTokenAndAdmin,updateProduct)

//delete product
router.delete('/:id',verifyTokenAndAdmin,deleteProduct)

//get product
router.get('/:id',getProduct)

//get all products
router.get('/',getAllProducts)

module.exports = router




