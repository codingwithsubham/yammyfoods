import axios from 'axios';
const { API_CONFIG } = require('../../common/constants');
const { PAYMENT_CAPTURED } = require('../../actions/types');

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
export const loadRazorpayToggle = (price) => async (dispatch) => {
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
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: data.id,
    handler: function () {
      dispatch({
        type: PAYMENT_CAPTURED,
        payload: 'Success',
      });
    },
    prefill: {
      name: 'Yammy Foods Customer',
      email: 'gaurav.kumar@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
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
