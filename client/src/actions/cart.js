import axios from 'axios';
import { ADD_CART_ITEMS, REMOVE_CART_ITEMS, GET_CART_ITEMS } from './types';
import { setAlert } from './alert';
const { API_CONFIG } = require('../common/constants');

// Add to cart
export const addToCart = addItem => async dispatch => {
  try {
    const res = await axios.put('/api/cart/add', addItem, API_CONFIG);
    dispatch({
      type: ADD_CART_ITEMS,
      payload: res.data
    });
    dispatch(setAlert('Item Added', 'success'));
  } catch (err) {
    console.log(err);
  }
};

//remove from cart
export const removeFromCart = removeItem => async dispatch => {
  try {
    const res = await axios.put('/api/cart/remove', removeItem, API_CONFIG);
    dispatch({
      type: REMOVE_CART_ITEMS,
      payload: res.data
    });
    dispatch(setAlert('Item Removed', 'danger'));
  } catch (err) {
    console.log(err);
  }
};

//get cart items
export const getCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`, API_CONFIG);
    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
