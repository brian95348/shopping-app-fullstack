
import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    loading : false,
    products: [],
    listError: ''
}

const productsReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading:true
            };
        case actionCreators.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading:false,
                products:action.payload,
                listError:''
            };
        case actionCreators.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading:false,
                listError:action.payload,
                products:[]
            };
        default:
            return state;
    }
}

export const fetchProducts = () => async (dispatch) => {
    dispatch(actionCreators.fetchProductsRequest())
    try {
        const {data} = await axios.get('http://localhost:5000/api/products');
        dispatch(actionCreators.fetchProductsSuccess(data))
    } catch (error) {
        dispatch(actionCreators.fetchProductsFailure(error))
    }      
}


export default productsReducer