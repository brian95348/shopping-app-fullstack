import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import logger from 'redux-logger'
import rootReducer from './rootReducer'

const middleWare = [thunk]

const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const INITIAL_STATE = {
    cart: {
        cartItems: cartFromLocalStorage
    }
}

export const store = createStore(rootReducer,INITIAL_STATE,composeWithDevTools(applyMiddleware(...middleWare)))