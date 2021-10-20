import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    deleting : false,
    deleted: false,
    deleteError: ''
}

const deleteProductReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                deleting:true
            };
        case actionCreators.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleting:false,
                deleted:true,
                deleteError:''
            };
        case actionCreators.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                deleting:false,
                deleteError:action.payload,
                deleted:false
            };
        default:
            return state;
    }
}

export const deleteProduct = (id,token) => async (dispatch) => {
    dispatch(actionCreators.deleteProductRequest())
    try {
        await axios.delete(`http://localhost:5000/api/products/${id}`,
                                        {headers: {token: `Bearer ${token}`}});
        dispatch(actionCreators.deleteProductSuccess())
    } catch (error) {
        dispatch(actionCreators.deleteProductFailure(error))
    }      
}

export default deleteProductReducer