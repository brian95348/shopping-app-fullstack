import {combineReducers} from 'redux'
import productsReducer from './Products/reducer'
import cartReducer from './cart/reducer'
import productDetailReducer from './Product/reducer'
import userLoginReducer from './Users/login/reducer'
import modalReducer from './modal/reducer'
import createProductReducer from './admin/product/create/reducer'
import deleteProductReducer from './admin/product/delete/reducer'
import updateProductReducer from './admin/product/update/reducer'
import userRegistrationReducer from './Users/register/reducer'

const rootReducer = combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegistration: userRegistrationReducer,
    modal: modalReducer,
    createProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer
})

export default rootReducer