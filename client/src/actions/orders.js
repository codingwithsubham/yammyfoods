import axios from 'axios';
import {
  GET_ORDER,
  CHECKOUT_LOADING,
  GET_ORDERS,
  ORDER_LOADING,
} from './types';
import { setAlert } from './alert';
const { API_CONFIG } = require('../common/constants');

// get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LOADING,
    });
    dispatch({
      type: CHECKOUT_LOADING,
    });
    const res = await axios.get(`/api/orders/${id}`, API_CONFIG);
    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHECKOUT_LOADING,
    });
  }
};

// get Orders for a Customer
export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders/', API_CONFIG);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('Unable to Fetch Details', 'danger'));
  }
};
