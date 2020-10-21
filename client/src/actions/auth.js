import axios from 'axios';
import {
  SEND_OTP_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
const { API_CONFIG } = require('../common/constants');

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/load-user', API_CONFIG);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//send OTP
export const sendOtp = (contrycode, mobile) => async dispatch => {
  const body = JSON.stringify({ contrycode, mobile });
  try {
    const res = await axios.post('/api/auth/sendotp', body, API_CONFIG);

    dispatch({
      type: SEND_OTP_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('OTP Send Successfully', 'success'));
  } catch (err) {
    console.log(err);
  }
};

//Verify OTP and Login
export const login = (contrycode, mobile, loginType, otp) => async dispatch => {
  const body = JSON.stringify({ contrycode, mobile, loginType, otp });
  try {
    const res = await axios.post('/api/auth/verifyotp', body, API_CONFIG);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Welcome Back', 'success'));
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
