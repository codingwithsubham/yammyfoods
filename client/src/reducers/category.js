import { GET_FOOD_HUBS, SET_LOADING_TRUE } from '../actions/types';

const initialState = {
  loading: true,
  category: null,
  categories: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
        category: null
      };

    case GET_FOOD_HUBS:
      return {
        ...state,
        loading: false,
        categories: payload
      };

    default:
      return state;
  }
}
