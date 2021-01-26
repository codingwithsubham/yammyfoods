import axios from 'axios';
import { GET_WALLET_BALLANCE, WALLET_BALANCE_LOADING } from './types';
import { setAlert } from './alert';
const { API_CONFIG } = require('../common/constants');

// get Orders for a Customer
export const getWalletBalance = () => async (dispatch) => {
  try {
    dispatch({
      type: WALLET_BALANCE_LOADING,
    });
    const res = await axios.get('/api/wallet/', API_CONFIG);
    dispatch({
      type: GET_WALLET_BALLANCE,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('Unable to Fetch Wallet Balance', 'danger'));
  }
};

// get Orders for a Customer
export const debitWalletBallance = (debitamt) => async (dispatch) => {
  try {
    await axios.post('/api/wallet/debit', { debitamt }, API_CONFIG);
    getWalletBalance();
  } catch (err) {
    dispatch(setAlert('Unable to Fetch Wallet Balance', 'danger'));
  }
};
