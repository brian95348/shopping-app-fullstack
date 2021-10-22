import axios from 'axios'
import * as actionCreators from './actions'
// ?   JSON.parse(sessionStorage.getItem("user")) : 
console.log(sessionStorage);
const initialState = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {
                        username: '',
                        userId: '',
                        isAdmin: false,
                        isloggingIn: false,
                        isloggedIn : false,
                        token: '',
                        loginError:''
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
                loginError: action.payload.message
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
                loginError: action.payload
            };
        case actionCreators.LOGOUT:
            return {
                ...state,
                isloggingIn:false,
                isloggedIn: false,
                token:'',
                username: '',
                userId: '',
                isAdmin: false,
                loginError: ''
            };
        default:
            return state;
    }
}

export const userLogin = (userData) => async (dispatch,getState) => {
    dispatch(actionCreators.userLoginRequest())
    try {
        const {data} = await axios.post('http://localhost:5000/api/auth/login',userData);
        dispatch(actionCreators.userLoginSuccess(data))
        sessionStorage.setItem('user',JSON.stringify(getState().userLogin))
    } catch (err) {
        dispatch(actionCreators.userLoginFailure(err))
    }     
}

export const userLogout = () => async (dispatch) => {
    dispatch(actionCreators.userLogoutRequest())  
    sessionStorage.removeItem('user')   
}

export default userLoginReducer