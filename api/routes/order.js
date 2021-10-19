const router = require('express').Router()
const {verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin} = require('../verifyToken')
const {getAllOrders,getUserOrders,createOrder,
        deleteOrder,updateOrder} = require('../views/order')

//router.route('/').get().post()
//create order
router.post('/',verifyToken,createOrder)

//update order
router.put('/:id',verifyTokenAndAdmin,updateOrder)

//delete order
router.delete('/:id',verifyTokenAndAdmin,deleteOrder)

//get user orders
router.get('/:userId',verifyTokenAndAuth,getUserOrders)

//get all orders
router.get('/',verifyTokenAndAdmin,getAllOrders)

module.exports = router


