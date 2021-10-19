const User = require('../models/User')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const register = async (req,res) => {
    
    const {username,password,email} = req.body
    if (!username && !password && !email) {
        res.status(400).json({message:'Bad request, please supply all the values'})
    }
    const isAdmin = req.body.isAdmin ? req.body.isAdmin: false
    const newUser = new User({
        username: req.body.username,
        password: cryptoJS.AES.encrypt(password,process.env.SECRET_PHRASE).toString(),
        email: req.body.email,
        isAdmin: isAdmin
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json({status:'created',newUser:savedUser})
    } catch (error) {
        res.status(500).json({success: false, message:error})
    }
}

const login = async (req,res) => {
    const {username} = req.body
    if (!username || !req.body.password ) {
        return res.status(400).json({message:'Bad request, please supply all the login credentials'})
    }
    try {
        const user = await User.findOne({username})
        if (!user) return res.status(404).json({message: "User not found!, check your username"})
        const dbPassword = cryptoJS.AES.decrypt(
            user.password,process.env.SECRET_PHRASE
        ).toString(cryptoJS.enc.Utf8) //cryptoJS.enc.utf8
        if (dbPassword !== req.body.password) return res.status(401).json({message:"Wrong credentials"})
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "3d"
        })
        const {password, ...others} = user._doc
        return res.status(200).json({success:true,...others, accessToken})
    } catch (error) {
        return res.status(500).json({success: false, message:error})
    }
}

module.exports = {login,register}