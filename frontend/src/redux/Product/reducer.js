import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    loading : false,
    product: {},
    detailError: ''
}

const productDetailReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading:true
            };
        case actionCreators.FETCH_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading:false,
                product:action.payload,
                detailError:''
            };
        case actionCreators.FETCH_PRODUCT_DETAIL_FAILURE:
            return {
                ...state,
                loading:false,
                detailError:action.payload,
                product:{}
            };
        case actionCreators.FETCH_PRODUCT_DETAIL_RESET:
            return {
                product:{}
            };
        default:
            return state;
    }
}

export const fetchProductDetail = (id) => async (dispatch) => {
    dispatch(actionCreators.fetchProductDetailRequest())
    try {
        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`);
        dispatch(actionCreators.fetchProductDetailSuccess(data))
    } catch (error) {
        dispatch(actionCreators.fetchProductDetailFailure(error))
    }      
}

export const removeProductDetail = () => (dispatch) => {
    dispatch(actionCreators.fetchProductDetailReset())
}

export default productDetailReducer