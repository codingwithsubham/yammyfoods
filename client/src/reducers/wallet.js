import {
  GET_WALLET_BALLANCE,
  WALLET_BALANCE_LOADING,
  CREDIT_WALLET_BALANCE,
  DEBIT_WALLET_BALANCE,
  GET_WALLET_TRANSACTIONS,
} from '../actions/types';

const initialState = {
  loading: true,
  wallet: 0,
  transactions: [],
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

    case DEBIT_WALLET_BALANCE:
      return {
        ...state,
        loading: false,
        wallet: parseFloat(state.wallet) - parseFloat(payload),
      };

    case CREDIT_WALLET_BALANCE:
      return {
        ...state,
        loading: false,
        wallet: parseFloat(state.wallet) + parseFloat(payload),
      };

    case GET_WALLET_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: payload,
      };

    case WALLET_BALANCE_LOADING:
      return {
        ...state,
        loading: true,
        wallet: null,
        transactions: [],
      };

    default:
      return state;
  }
}
