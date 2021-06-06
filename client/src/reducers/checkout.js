import {
  GET_SHIPPING_PRICE,
  CHECKOUT_SUCCESS,
  CHECKOUT_LOADING,
  PAYMENT_CAPTURED,
  PAYMENT_INIT,
} from "../actions/types";

const initialState = {
  loading: true,
  delivery_charge: 0,
  checkoutData: null,
  paymentStatus: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIPPING_PRICE:
      return {
        ...state,
        loading: false,
        delivery_charge: payload.totalCost,
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        checkoutData: payload,
      };
    case CHECKOUT_LOADING:
      return {
        ...state,
        loading: true,
        checkoutData: null,
        delivery_charge: 0,
        paymentStatus: null,
      };

    case PAYMENT_INIT:
      return {
        ...state,
        loading: false,
        paymentStatus: null,
      };

    case PAYMENT_CAPTURED:
      return {
        ...state,
        loading: false,
        paymentStatus: payload,
      };
    default:
      return state;
  }
}
