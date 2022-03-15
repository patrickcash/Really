import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAIL } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true
             };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access)
            return {
               ...state,
               isAuthenticated: true,
               loading: false,
               token: payload.access
            };
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
               ...state,
               isAuthenticated: false,
               loading: false
            };
        default:
            return state;
    }
};