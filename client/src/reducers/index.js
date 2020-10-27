import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import products from './products';
import cart from './cart';
import category from './category';
import sidebar from './sidebar';
import orders from './orders';
import checkout from './checkout';

export default combineReducers({
  alert,
  auth,
  products,
  cart,
  category,
  sidebar,
  checkout,
  orders
});
