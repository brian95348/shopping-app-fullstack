export const FETCH_PRODUCT_DETAIL_REQUEST = "FETCH_PRODUCT_DETAIL_REQUEST"
export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS"
export const FETCH_PRODUCT_DETAIL_FAILURE = "FETCH_PRODUCT_DETAIL_FAILURE"
export const FETCH_PRODUCT_DETAIL_RESET = "FETCH_PRODUCT_DETAIL_RESET"

export const fetchProductDetailRequest = ()=>{
    return {
        type:FETCH_PRODUCT_DETAIL_REQUEST
    }
}

export const fetchProductDetailSuccess = (product)=>{
    return {
        type:FETCH_PRODUCT_DETAIL_SUCCESS,
        payload:product
    }
}

export const fetchProductDetailFailure = (err)=>{
    return {
        type:FETCH_PRODUCT_DETAIL_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}

export const fetchProductDetailReset = (err)=>{
    return {
        type:FETCH_PRODUCT_DETAIL_RESET
    }
}