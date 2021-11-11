const Product = require('../models/Product')
const {asyncWrapper} = require('../middleware/middleware')

const createProduct = asyncWrapper (async (req,res)=>{
    const newProduct = new Product({...req.body,image:req.file.filename})
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
    
})

const updateProduct = asyncWrapper (async (req,res)=>{
    let imageURL
    if (!req.file) {
        imageURL = req.body.oldURL
    } else {
        imageURL = req.file.filename
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
            image: imageURL
        },
        {new:true}
    )
    res.status(200).json({success:true,updatedProduct})
})

const deleteProduct = asyncWrapper(async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({success:true,message:`${req.params.id} deleted successfully`})
})

const getProduct = asyncWrapper(async (req,res)=>{
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
})

const search = async (req,res) => {
    const {featured,fields,name,sort, numericFilters} = req.query
    const query = {}
    if (featured) {
        query.featured = featured === 'true' ? true: false
    }
    if (name) {
        query.name = {$regex: value, $options: 'i'}
    }
    if (numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq'
        }
        const regex = /\b(<|>|>=|<=|=)\b/g
        let filter = numericFilters.replace(regex,(match)=> `-${operatorMap[match]}-`)
        const options = ['price']
        filters = filters.split(',').forEach(item => {
            const [field,operator,value] = item.split('-')
            if (options.includes(field)) {
                query[field] = {[operator]: Number(value)}
            }
        });
    }
    const results = Products.find(query)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        results = results.sort(sortList)
    } else {
        results = results.sort('createdAt')
    }
    if (fields) {
        const fieldsList = sort.split(',').join(' ')
        results = results.sort(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    results.skip(skip).limit(limit)
}

const getAllProducts = asyncWrapper(async (req,res)=>{
    // name:{$regex: value, $options: 'i'}
    // if (featured) {
    //     queryObject = featured === 'true' ? true: false
    // }
    const { qNew, qCategory } = req.query
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
})



module.exports = {getAllProducts,getProduct,createProduct,deleteProduct,updateProduct}