import { GET_PRODUCTS, GET_PRODUCT, SET_LOADING_TRUE } from '../actions/types';

const initialState = {
  loading: true,
  product: null,
  products: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
        product: null
      };
    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: payload
      };

    case GET_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload
      };

    default:
      return state;
  }
}
