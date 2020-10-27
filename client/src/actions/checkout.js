import axios from 'axios';
import {
  GET_SHIPPING_PRICE,
  CHECKOUT_SUCCESS,
  CHECKOUT_LOADING
} from './types';
const { API_CONFIG } = require('../common/constants');

// Get Shipping
export const getShipping = data => async dispatch => {
  try {
    const res = await axios.post(
      '/api/checkout/get-shipping/',
      data,
      API_CONFIG
    );

    dispatch({
      type: GET_SHIPPING_PRICE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// Do Checkout
export const checkout = data => async dispatch => {
  dispatch({
    type: CHECKOUT_LOADING
  });
  try {
    const res = await axios.post('/api/checkout/', data, API_CONFIG);

    if (res.data) {
      await axios.delete('/api/cart/reset-cart/', API_CONFIG);
    }

    dispatch({
      type: CHECKOUT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
