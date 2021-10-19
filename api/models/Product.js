const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            unique: true,
            required: true
        },
        description:{
            type: String,
            unique: true
        },
        image:{
            type: String,
            required: true,
        },
        category:{
            type: Array            
        },
        size:{
            type: String,
        },
        color:{
            type: String
        },
        price:{
            type: Number,
            required: true,
        },
    }, {timestamps: true}
)

module.exports = mongoose.model("Product",ProductSchema)