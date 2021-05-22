import {
  GET_ORDER,
  GET_ORDERS,
  ORDER_LOADING,
  GET_ASSIGNED_ORDERS,
  GET_COMPLETED_ORDERS,
  GET_MARKED_ORDERS,
} from '../actions/types';

const initialState = {
  loading: true,
  orders: [],
  order: null,
  assigned_orders: [],
  marked_orders: [],
  completed_orders: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDER:
      return {
        ...state,
        loading: false,
        order: payload,
      };

    case GET_ORDERS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };

    case GET_ASSIGNED_ORDERS:
      return {
        ...state,
        loading: false,
        assigned_orders: payload,
      };

    case GET_MARKED_ORDERS:
      return {
        ...state,
        loading: false,
        marked_orders: payload,
      };

    case GET_COMPLETED_ORDERS:
      return {
        ...state,
        loading: false,
        completed_orders: payload,
      };

    case ORDER_LOADING:
      return {
        ...state,
        loading: true,
        order: null,
      };

    default:
      return state;
  }
}
