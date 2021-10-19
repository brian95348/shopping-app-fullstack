const router = require('express').Router()
const {verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin} = require('../verifyToken')
const {getAllCarts,getUserProducts,
    createCart,updateCart,
    deleteCart} = require('../views/cart')

//router.route('/').get().post()
//create cart
router.post('/create',verifyToken,createCart)

//update cart
router.put('/:id',verifyTokenAndAuth,updateCart)

//delete cart
router.delete('/:id',verifyTokenAndAuth,deleteCart)

//get user product
router.get('/:userId',getUserProducts)

//get all carts
router.get('/',verifyTokenAndAdmin,getAllCarts)

module.exports = router




