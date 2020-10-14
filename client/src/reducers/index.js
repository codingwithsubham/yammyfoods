import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import products from './products';
import cart from './cart';
import category from './category';

export default combineReducers({
  alert,
  auth,
  products,
  cart,
  category
});
