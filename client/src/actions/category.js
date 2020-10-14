import axios from 'axios';
import { GET_FOOD_HUBS, SET_LOADING_TRUE } from './types';
const { API_CONFIG } = require('../common/constants');

// Get Food Hubs
export const getFoodHubs = () => async dispatch => {
  dispatch({
    type: SET_LOADING_TRUE
  });
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

// Get Rests by Food Hub
export const getFoodHubsById = id => async dispatch => {
  dispatch({
    type: SET_LOADING_TRUE
  });
  try {
    const res = await axios.get(`/api/category/foodshubs/${id}`, API_CONFIG);
    dispatch({
      type: GET_FOOD_HUBS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
