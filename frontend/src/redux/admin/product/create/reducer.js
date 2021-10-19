import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    creating : false,
    newProduct: {},
    error: ''
}

const createProductReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                creating:true
            };
        case actionCreators.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                creating:false,
                newProduct:action.payload,
                error:''
            };
        case actionCreators.CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                creating:false,
                error:action.payload,
                newProduct:{}
            };
        default:
            return state;
    }
}

export const createProduct = (newProduct) => async (dispatch) => {
    dispatch(actionCreators.createProductRequest(newProduct))
    try {
        const {data} = await axios.post(`http://localhost:5000/api/products/add`,newProduct);
        dispatch(actionCreators.createProductSuccess(data))
    } catch (error) {
        dispatch(actionCreators.createProductFailure(error))
    }      
}

export default createProductReducer