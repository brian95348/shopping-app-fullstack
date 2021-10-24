import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    isUpdating : false,
    isUpdated: false,
    updatedProduct: {},
    updateError: ''
}

const updateProductReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                isUpdating:true
            };
        case actionCreators.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isUpdating:false,
                isUpdated: true,
                updatedProduct:action.payload,
                updateError:''
            };
        case actionCreators.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                isUpdating:false,
                isUpdated: false,
                updateError:action.payload,
                updatedProduct:{}
            };
        default:
            return state;
    }
}

export const updateProduct = (id,updatedProduct,token) => async (dispatch) => {
    dispatch(actionCreators.updateProductRequest(updatedProduct))
    try {
        const {data} = await axios.put(`http://localhost:5000/api/products/${id}`,updatedProduct,
                                                    {headers: {token: `Bearer ${token}`,
                                                    'Content-Type': 'multipart/form-data'}});
        dispatch(actionCreators.updateProductSuccess(data))
    } catch (error) {
        dispatch(actionCreators.updateProductFailure(error))
    }      
}

export default updateProductReducer