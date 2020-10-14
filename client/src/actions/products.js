import axios from 'axios';
import { GET_PRODUCTS, GET_PRODUCT, SET_LOADING_TRUE } from './types';
//import setAuthToken from '../utils/setAuthToken';

// Load Products
export const getLatestproducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

//get product by id
export const getProductById = id => async dispatch => {
  dispatch({
    type: SET_LOADING_TRUE
  });
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
