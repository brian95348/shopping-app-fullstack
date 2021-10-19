const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


router.post('/payment',(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    },(strErr,strRes)=>{
        if (strErr) {
            res.status(500).json(strErr)
        } else {
            res.status(200).json(stripeRes)
        }
    })
})

module.exports = router