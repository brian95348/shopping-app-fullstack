export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST"
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS"
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAIL"

export const deleteProductRequest = ()=>{
    return {
        type:DELETE_PRODUCT_REQUEST
    }
}

export const deleteProductSuccess = ()=>{
    return {
        type:DELETE_PRODUCT_SUCCESS
    }
}

export const deleteProductFailure = (err)=>{
    return {
        type:DELETE_PRODUCT_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
