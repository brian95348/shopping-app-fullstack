export const REGISTER_REQUEST = "REGISTER_REQUEST"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILURE = "REGISTER_FAILURE"

export const userRegistrationRequest = ()=>{
    return {
        type:REGISTER_REQUEST
    }
}


export const userRegistrationSuccess = (user)=>{
    return {
        type:REGISTER_SUCCESS,
        payload : user
    }
}

export const userRegistrationFailure = (error)=>{
    return {
        type:REGISTER_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

