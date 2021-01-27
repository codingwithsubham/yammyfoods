import axios from 'axios';
const { API_CONFIG } = require('../common/constants');
const { PAYMENT_CAPTURED } = require('./types');

//init Razorpay
export const showRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
};

//Razorpay Poup Form
export const loadRazorpayToggle = (price, details) => async (dispatch) => {
  const res = await showRazorpay();
  if (!res) {
    alert('can not load payment method');
    return;
  }
  const response = await axios.post('/api/razorpay/', { price }, API_CONFIG);
  const data = response.data;
  var options = {
    key: 'rzp_test_GPnkCc1uMzQQSQ',
    amount: data.amount,
    currency: data.currency,
    name: 'Yammy Foods',
    description: 'Yammy Foods Order Online',
    image:
      'https://order.b-cdn.net/wp-content/uploads/2019/12/Logo-Main-e1592128542736.png',
    order_id: data.id,
    handler: function () {
      dispatch({
        type: PAYMENT_CAPTURED,
        payload: 'Success',
      });
    },
    modal: {
      ondismiss: function () {
        dispatch({
          type: PAYMENT_CAPTURED,
          payload: 'Closed',
        });
      },
    },
    prefill: {
      name: 'Yammy Foods Customer',
      email: 'yammyfoods@gmail.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Yammy Foods Bengalore',
    },
    theme: {
      color: '#ffcc00ff',
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function () {
    dispatch({
      type: PAYMENT_CAPTURED,
      payload: 'Fail',
    });
  });
  rzp1.open();
};
