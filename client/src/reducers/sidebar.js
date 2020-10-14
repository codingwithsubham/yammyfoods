import { SHOW_SIDEBAR, HIDE_SIDEBAR } from '../actions/types';

const initialState = {
  loading: true,
  open: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        loading: true,
        open: payload
      };

    case HIDE_SIDEBAR:
      return {
        ...state,
        loading: false,
        open: payload
      };

    default:
      return state;
  }
}
