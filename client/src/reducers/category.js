import {
  GET_FOOD_HUBS,
  SET_LOADING_TRUE_CATEGORY,
  GET_RESTROS,
  GET_RESTRO
} from '../actions/types';

const initialState = {
  loading: true,
  category: null,
  categories: [],
  restros: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FOOD_HUBS:
      return {
        ...state,
        loading: false,
        categories: payload
      };

    case GET_RESTROS:
      return {
        ...state,
        loading: false,
        restros: [
          ...state.restros.filter(restro => restro.foodHub !== payload.foodHub),
          payload
        ]
      };

    case GET_RESTRO:
      return {
        ...state,
        loading: false,
        category: payload
      };

    case SET_LOADING_TRUE_CATEGORY:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
