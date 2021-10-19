const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if (err) res.status(403).json("Token not valid")
            console.log('valid token');
            req.user = user;
            next()
        })
    } else {
        res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("Not Authorized")
        }
    })
}


const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin) {
            console.log('finally');
            next()
        } else {
            res.status(403).json("Not Authorized")
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin}