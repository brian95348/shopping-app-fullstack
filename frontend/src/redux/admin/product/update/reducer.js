import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    updating : false,
    updatedProduct: {},
    updateError: ''
}

const updateProductReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                updating:true
            };
        case actionCreators.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updating:false,
                updatedProduct:action.payload,
                updateError:''
            };
        case actionCreators.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                updating:false,
                updateError:action.payload,
                updatedProduct:{}
            };
        default:
            return state;
    }
}

export const updateProduct = (id,updatedProduct) => async (dispatch) => {
    dispatch(actionCreators.updateProductRequest(updatedProduct))
    try {
        const {data} = await axios.put(`http://localhost:5000/api/products/${id}/update`,updatedProduct,
                                                    {headers: {token: `Bearer ${token}`}});
        dispatch(actionCreators.updateProductSuccess(data))
    } catch (error) {
        dispatch(actionCreators.updateProductFailure(error))
    }      
}

export default updateProductReducer