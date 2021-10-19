import axios from 'axios'

const initialState = {
    loading : false,
    cartItems: [],
    error: ''
}

const ADD_TO_CART = "ADD_TO_CART"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const CART_RESET = "CART_RESET"

const cartReducer = (state=initialState,action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const itemExists = state.cartItems.find((x)=> x._id === item._id);
            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x)=>x._id === itemExists._id ? item:x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x)=>x._id !== action.payload)
            };
        default:
            return state;
    }
}

export const addProductToCart = (id, qty) => async (dispatch,getState) => {
    const {data} = await axios.get(`http://localhost:5000/api/products/${id}`);
    const {_id,title,image,price} = data
    dispatch(
        {
            type: ADD_TO_CART,
            payload:{
                _id,title,image,price,qty
            }
        }
    );
    localStorage.setItem("cart",JSON.stringify(getState().cart.cartItems))
}

export const removeProductFromCart = (id) => (dispatch,getState) => {
    dispatch(
        {
            type: REMOVE_FROM_CART,
            payload:id
        }
    );
    localStorage.setItem("cart",JSON.stringify(getState().cart.cartItems))
}

export default cartReducer