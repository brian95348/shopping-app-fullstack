const router = require('express').Router()


const {login,register} = require('../views/auth')

router.route('/register').post(register)

router.route('/login').post(login)

module.exports = router