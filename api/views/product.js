const Product = require('../models/Product')

const createProduct = async (req,res)=>{
    const newProduct = new Product({...req.body,image:req.file.filename})
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateProduct = async (req,res)=>{
    let imageURL
    if (!req.file) {
        imageURL = req.body.oldURL
    } else {
        imageURL = req.file.filename
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
                image: imageURL
            },
            {new:true}
        )
        res.status(200).json({success:true,updatedProduct})
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,message:`${req.params.id} deleted successfully`})
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllProducts = async (req,res)=>{
    const { qNew, qCategory } = req.query
    try {
        let products
        if (qNew) {
            products = await Product.find().sort({createdAt:-1}).limit(5)
        } else if (qCategory) {
            products = await Product.find({categories:{
                $in: [qCategory]
            }})
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {getAllProducts,getProduct,createProduct,deleteProduct,updateProduct}