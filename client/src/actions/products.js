import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  SET_LOADING_TRUE,
  SEARCH_PRODUCTS_DATA,
} from "./types";
//import setAuthToken from '../utils/setAuthToken';
const { API_CONFIG } = require("../common/constants");

// Load Products
export const getLatestproducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//get product by id
export const getProductById = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING_TRUE,
  });
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//get product by search
export const searchProduct = (keyword) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/products/search`,
      { keyword },
      API_CONFIG
    );
    dispatch({
      type: SEARCH_PRODUCTS_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//Submit Rating
export const submitRating = (data, order_id) => async (dispatch) => {
  try {
    await axios.post(
      `/api/products/submit-rating`,
      { data, order_id },
      API_CONFIG
    );
  } catch (err) {
    console.log(err);
  }
};
