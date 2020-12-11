import { GET_ORDER, GET_ORDERS } from '../actions/types';

const initialState = {
  loading: true,
  orders: [],
  order: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDER:
      return {
        ...state,
        loading: false,
        order: payload
      };

    case GET_ORDERS:
      return {
        ...state,
        loading: false,
        orders: payload
      };

    default:
      return state;
  }
}
