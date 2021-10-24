const path = require('path')
const router = require('express').Router()
const {verifyTokenAndAdmin} = require('../verifyToken')
const {getAllProducts,getProduct,
        createProduct,updateProduct,deleteProduct} = require('../views/product')
const multer = require('multer')

const imageStore = multer.diskStorage({
        destination: 'frontend/public/assets/products/',
        filename: (req,file,cb) => {
                cb(null, file.fieldname + '_' + Date.now()
                + path.extname(file.originalname))
        }
})

const imageUpload = multer({
        storage: imageStore,
        limits: {
                fileSize: 1000000
        },
        fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                        return cb(new Error('Only image files are allowed!'));
                }
           cb(undefined, true);
        }
})


//router.route('/').get().post()
//create product
router.post('/add',[verifyTokenAndAdmin, imageUpload.single('image')], createProduct)

//update product
router.put('/:id',[verifyTokenAndAdmin, imageUpload.single('image')], updateProduct)

//delete product
router.delete('/:id',verifyTokenAndAdmin,deleteProduct)

//get product
router.get('/:id',getProduct)

//get all products
router.get('/',getAllProducts)

module.exports = router




