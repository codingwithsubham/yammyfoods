import {
  GET_FOOD_HUBS,
  GET_RESTROS,
  GET_RESTRO,
  SEARCH_RESTRO_DATA,
} from '../actions/types';

const initialState = {
  loading: true,
  category: null,
  categories: [],
  restros: [],
  searchRestroData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FOOD_HUBS:
      return {
        ...state,
        loading: false,
        categories: payload,
      };

    case GET_RESTROS:
      return {
        ...state,
        loading: false,
        restros: [
          ...state.restros.filter(
            (restro) => restro.foodHub !== payload.foodHub
          ),
          payload,
        ],
      };

    case GET_RESTRO:
      return {
        ...state,
        loading: false,
        category: payload,
      };

    case SEARCH_RESTRO_DATA:
      return {
        ...state,
        loading: false,
        searchRestroData: payload,
      };

    default:
      return state;
  }
}
