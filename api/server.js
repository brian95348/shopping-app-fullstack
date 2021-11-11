
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path');

const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const cartRoutes = require('./routes/cart')

const {errorHandler} = require('./middleware/middleware')

dotenv.config()
const app = express()
app.use(express.static(__dirname + '/public/'));
app.use(express.json())
app.use(errorHandler)
app.use(cors())
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/orders',orderRoutes)

const uri = process.env.MONGO_ATLAS_URL
const port = process.env.PORT || 5000
 //unifiedTopology:true
const start = async () => {
    try {
        await mongoose.connect(uri, {useNewUrlParser:true})
        app.listen(port,()=>{
        console.log(`server running on port ${port}...`);
        })
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

start()


