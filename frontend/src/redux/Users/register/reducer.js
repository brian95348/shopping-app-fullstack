import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    isRegistering: false,
    isRegistered: false,
    newUser: {},
    registrationError: ''
}

const userRegistrationReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.REGISTER_REQUEST:
            return {
                ...state,
                isRegistering:true
            };
        case actionCreators.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering:false,
                newUser: action.payload,
                isRegistered: true
            };
        case actionCreators.REGISTER_FAILURE:
            return {
                ...state,
                isRegistering:false,
                isRegistered: false,
                newUser: {},
                registrationError: action.payload
            };
        default:
            return state;
    }
}

export const userRegistration = (userData) => async (dispatch) => {
    dispatch(actionCreators.userRegistrationRequest())
    try {
        const {data} = await axios.post('http://localhost:5000/api/auth/register',userData);
        dispatch(actionCreators.userRegistrationSuccess(data.newUser))
    } catch (err) {
        dispatch(actionCreators.userRegistrationFailure(err))
    }     
}

export default userRegistrationReducer