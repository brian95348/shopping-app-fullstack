export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST"
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS"
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAIL"

export const createProductRequest = ()=>{
    return {
        type:CREATE_PRODUCT_REQUEST
    }
}

export const createProductSuccess = (newProduct)=>{
    return {
        type:CREATE_PRODUCT_SUCCESS,
        payload:newProduct
    }
}

export const createProductFailure = (err)=>{
    return {
        type:CREATE_PRODUCT_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
