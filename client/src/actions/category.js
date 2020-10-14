import axios from 'axios';
import { GET_FOOD_HUBS } from './types';
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
