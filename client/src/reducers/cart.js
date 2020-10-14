import {
  REMOVE_CART_ITEMS,
  ADD_CART_ITEMS,
  GET_CART_ITEMS
} from '../actions/types';

const initialState = {
  loading: true,
  cart: null,
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

    default:
      return state;
  }
}
