import axios from "axios";
import {
  GET_ORDER,
  CHECKOUT_LOADING,
  GET_ORDERS,
  ORDER_LOADING,
  GET_ASSIGNED_ORDERS,
  GET_COMPLETED_ORDERS,
  GET_MARKED_ORDERS,
} from "./types";
import { setAlert } from "./alert";
const { API_CONFIG } = require("../common/constants");

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
    const res = await axios.get("/api/orders/", API_CONFIG);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Unable to Fetch Details", "danger"));
  }
};

// get assigned Orders for Driver
export const getAssignedOrdersForDriver = () => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/orders/assigned-for-delivery",
      {},
      API_CONFIG
    );
    dispatch({
      type: GET_ASSIGNED_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Unable to Fetch Details", "danger"));
  }
};

// get out for delivery Orders for Driver
export const getMarkedOrdersForDriver = () => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/orders/marked-orders-for-delivery",
      {},
      API_CONFIG
    );
    dispatch({
      type: GET_MARKED_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Unable to Fetch Details", "danger"));
  }
};

// get Completed Orders for Driver
export const getCompletedOrdersForDriver = (offset) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LOADING,
    });
    const res = await axios.post(
      "/api/orders/completed-for-delivery",
      { offset },
      API_CONFIG
    );
    dispatch({
      type: GET_COMPLETED_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Unable to Fetch Details", "danger"));
  }
};

// get Order Details
export const changeOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LOADING,
    });
    dispatch({
      type: CHECKOUT_LOADING,
    });
    const res = await axios.post(
      `/api/orders/change-status/${id}`,
      { status: status },
      API_CONFIG
    );
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
