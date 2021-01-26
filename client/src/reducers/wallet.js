import { GET_WALLET_BALLANCE, WALLET_BALANCE_LOADING } from '../actions/types';

const initialState = {
  loading: true,
  wallet: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WALLET_BALLANCE:
      return {
        ...state,
        loading: false,
        wallet: payload,
      };

    case WALLET_BALANCE_LOADING:
      return {
        ...state,
        loading: true,
        wallet: null,
      };

    default:
      return state;
  }
}
