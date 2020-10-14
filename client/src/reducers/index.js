import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import products from './products';
import cart from './cart';
import category from './category';
import sidebar from './sidebar';

export default combineReducers({
  alert,
  auth,
  products,
  cart,
  category,
  sidebar
});
