import axios from 'axios';
import {
  GET_WALLET_BALLANCE,
  WALLET_BALANCE_LOADING,
  CHECKOUT_LOADING,
  CREDIT_WALLET_BALANCE,
  DEBIT_WALLET_BALANCE,
  GET_WALLET_TRANSACTIONS,
} from './types';
import { setAlert } from './alert';
const { API_CONFIG } = require('../common/constants');

// get Orders for a Customer
export const getWalletBalance = () => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_LOADING,
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

// get debit wallet balance
export const debitWalletBallance = (debitamt) => async (dispatch) => {
  try {
    await axios.post('/api/wallet/debit', { debitamt }, API_CONFIG);
    dispatch({
      type: DEBIT_WALLET_BALANCE,
      payload: debitamt,
    });
  } catch (err) {
    dispatch(setAlert('Unable to Debit Wallet Balance', 'danger'));
  }
};

//credit wallet balance
export const creditWalletBalance = (creditamnt) => async (dispatch) => {
  try {
    await axios.post('/api/wallet/credit', { creditamnt }, API_CONFIG);
    dispatch({
      type: CREDIT_WALLET_BALANCE,
      payload: creditamnt,
    });
  } catch (err) {
    dispatch(setAlert('Unable to Credit Wallet Balance', 'danger'));
  }
};

// get Orders for a Customer
export const getPassBook = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/wallet/passbook', API_CONFIG);
    dispatch({
      type: GET_WALLET_TRANSACTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('Unable to Fetch Wallet Balance', 'danger'));
  }
};
