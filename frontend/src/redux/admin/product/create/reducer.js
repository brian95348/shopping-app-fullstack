import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    creating : false,
    newProduct: {},
    created: false,
    createError: ''
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
                created: true,
                newProduct:action.payload,
                createError:''
            };
        case actionCreators.CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                creating:false,
                created: false,
                createError:action.payload,
                newProduct:{}
            };
        default:
            return state;
    }
}

export const createProduct = (newproduct,token) => async (dispatch) => {
    dispatch(actionCreators.createProductRequest())
    try {
        const {data} = await axios.post(`http://localhost:5000/api/products/add`,newproduct,
                                            {headers: {token: `Bearer ${token}`,
                                     'Content-Type': 'multipart/form-data'   }});
        dispatch(actionCreators.createProductSuccess(data))
    } catch (error) {
        dispatch(actionCreators.createProductFailure(error))
    }      
}

export default createProductReducer