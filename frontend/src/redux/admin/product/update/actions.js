export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST"
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS"
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAIL"

export const updateProductRequest = ()=>{
    return {
        type:UPDATE_PRODUCT_REQUEST
    }
}

export const updateProductSuccess = (updatedProduct)=>{
    return {
        type:UPDATE_PRODUCT_SUCCESS,
        payload:updatedProduct
    }
}

export const updateProductFailure = (err)=>{
    return {
        type:UPDATE_PRODUCT_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
