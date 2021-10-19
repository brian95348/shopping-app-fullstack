
import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    username: '',
    userId: '',
    isAdmin: false,
    isloggingIn: false,
    isloggedIn : false,
    token: '',
    error:''
}

const userLoginReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.LOGIN_REQUEST:
            return {
                ...state,
                isloggingIn:true
            };
        case actionCreators.LOGIN_WRONG_CREDENTIALS:
            return {
                ...state,
                isloggingIn:false,
                isloggedIn: false,
                token:'',
                error: action.payload.message
            };
        case actionCreators.LOGIN_SUCCESS:
            return {
                ...state,
                isloggingIn:false,
                username:action.payload.username,
                userId:action.payload._id,
                isAdmin: action.payload.isAdmin,
                token:action.payload.accessToken,
                isloggedIn: true
            };
        case actionCreators.LOGIN_FAILURE:
            return {
                ...state,
                isloggingIn:false,
                isloggedIn: false,
                token:'',
                error: action.payload
            };
        case actionCreators.LOGOUT:
            return {
                ...state,
                isloggingIn:false,
                isloggedIn: false,
                token:'',
                error: ''
            };
        default:
            return state;
    }
}

export const userLogin = (userData) => async (dispatch) => {
    dispatch(actionCreators.userLoginRequest())
    try {
        const {data} = await axios.post('http://localhost:5000/api/auth/login',userData);
        console.log(data);
        if (data.success === true) dispatch(actionCreators.userLoginSuccess(data))
        if (data.message) dispatch(actionCreators.userLoginWrongCredentials(data))
    } catch (err) {
        dispatch(actionCreators.userLoginFailure(err))
    }      
}

export const userLogout = () => async (dispatch) => {
    dispatch(actionCreators.userLogoutRequest())     
}

export default userLoginReducer