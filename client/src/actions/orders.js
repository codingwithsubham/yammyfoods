import axios from 'axios';
import { GET_ORDER } from './types';
const { API_CONFIG } = require('../common/constants');

// Do Checkout
export const getOrderDetails = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}`, API_CONFIG);

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
