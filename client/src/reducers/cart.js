import {
  REMOVE_CART_ITEMS,
  ADD_CART_ITEMS,
  GET_CART_ITEMS,
  RESET_CART
} from '../actions/types';

const initialState = {
  loading: true,
  cart_items: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        loading: false,
        cart_items: payload
      };

    case ADD_CART_ITEMS:
      return {
        ...state,
        loading: false,
        cart_items: payload
      };

    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cart_items: payload,
        loading: false
      };

    case RESET_CART:
      return {
        ...state,
        cart_items: [],
        loading: false
      };

    default:
      return state;
  }
}
