export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_WRONG_CREDENTIALS = "LOGIN_WRONG_CREDENTIALS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT = "LOGOUT"

export const userLoginRequest = ()=>{
    return {
        type:LOGIN_REQUEST
    }
}

export const userLoginSuccess = (user)=>{
    return {
        type:LOGIN_SUCCESS,
        payload : user
    }
}

export const userLoginWrongCredentials = (resp)=>{
    return {
        type:LOGIN_WRONG_CREDENTIALS,
        payload : resp
    }
}

export const userLoginFailure = (error)=>{
    return {
        type:LOGIN_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const userLogoutRequest = ()=>{
    return {
        type:LOGOUT
    }
}
