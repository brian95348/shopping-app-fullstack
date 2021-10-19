
const router = require('express').Router()
const {verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin} = require('../verifyToken')
const {deleteUser,updateUser,getUser,
        getAllUsers, getUserStats} = require('../views/user')


//router.route('/:id').put()
//delete user
router.delete('/:id',verifyTokenAndAdmin,deleteUser)

//get user
router.get('/:id',verifyTokenAndAdmin,getUser)

//get all users
router.get('/',verifyTokenAndAdmin,getAllUsers)

//get user stats
router.get('/stats',verifyTokenAndAdmin,getUserStats)

//update user
router.put('/:id',verifyTokenAndAuth,updateUser)

module.exports = router