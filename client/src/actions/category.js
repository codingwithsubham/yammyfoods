import axios from 'axios';
import { GET_FOOD_HUBS, GET_PRODUCTS, SET_LOADING_TRUE } from './types';
const { API_CONFIG } = require('../common/constants');

// Get Food Hubs
export const getFoodHubs = () => async dispatch => {
  try {
    const res = await axios.get('/api/category/foodshubs', API_CONFIG);
    dispatch({
      type: GET_FOOD_HUBS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// Get Restros By  Id
export const getRestrosById = id => async dispatch => {
  dispatch({
    type: SET_LOADING_TRUE
  });
  try {
    const res = await axios.get(`/api/category/restros/${id}`, API_CONFIG);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
