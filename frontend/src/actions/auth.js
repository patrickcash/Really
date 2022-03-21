import axios from 'axios';
 import Cookies from 'universal-cookie';
import { setAlert } from './alert';
import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
//axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true;
const cookies = new Cookies();

export const login = (email, password) =>  async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ email, password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert('Authenticated Successfully', 'success'));
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        });

        dispatch(setAlert(`Error Authenticating: ${err}]`, 'error'));
    }
};

export const signup = ({ name, email, password, password2 }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    }

    const body = JSON.stringify({ name, email, password, password2 }); 

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/accounts/signup`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch(login(email, password));
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });

        dispatch(setAlert(`Error Signing up: ${err}`, 'error'));
    }
};

export const logout = () => dispatch => {
    dispatch(setAlert('Logout successful.', 'success'));
    dispatch({ type: LOGOUT });
}


