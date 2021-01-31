import axios from 'axios';
import {
  GET_FOOD_HUBS,
  GET_PRODUCTS,
  SET_LOADING_TRUE,
  GET_RESTROS,
  SEARCH_RESTRO_DATA,
  GET_RESTRO,
  SEARCH_LOADING_TRUE,
} from './types';
const { API_CONFIG } = require('../common/constants');

// Get Food Hubs
export const getFoodHubs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/category/foodshubs', API_CONFIG);

    dispatch({
      type: GET_FOOD_HUBS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get Restros By  Foodhub
export const getRestrosByFoodhub = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/category/foodshub/restros/${id}`,
      API_CONFIG
    );

    dispatch({
      type: GET_RESTROS,
      payload: {
        foodHub: id,
        restros: res.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// Get Products by Restros Id
export const getProductsByRestroId = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING_TRUE,
  });
  try {
    const res = await axios.get(
      `/api/category/products/restros/${id}`,
      API_CONFIG
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get Restro by id
export const getRestroById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/category/restro/${id}`, API_CONFIG);
    dispatch({
      type: GET_RESTRO,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//get Restros By Search
export const searchRestro = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_LOADING_TRUE,
    });
    const res = await axios.post(
      `/api/category/search`,
      { keyword },
      API_CONFIG
    );
    dispatch({
      type: SEARCH_RESTRO_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
