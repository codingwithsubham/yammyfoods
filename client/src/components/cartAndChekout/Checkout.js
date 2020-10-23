import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddressDetails from './CheckoutAddress';
import TimeArea from './CheckoutTimeArea';
import Cart from './Cart';

const Checkout = ({ cart: { cart_items }, auth: { user } }) => {
  const [data, setData] = useState({
    address: null,
    locationAndTime: null,
    payment: null,
    shipping: 0
  });

  const [formFlagdata, setFormFlagdata] = useState({
    addressFlag: true,
    locationAndTimeFlag: false,
    paymentFlag: false
  });

  const { address, locationAndTime, payment } = data;
  const { addressFlag, locationAndTimeFlag, paymentFlag } = formFlagdata;

  const addedAddr = propdata => {
    setData({ ...data, address: propdata });
    setFormFlagdata({
      addressFlag: false,
      locationAndTimeFlag: true,
      paymentFlag: false
    });
  };

  const timeArea = (propdata, action) => {
    setData({ ...data, locationAndTime: propdata });
    if (action) {
      setFormFlagdata({
        addressFlag: false,
        locationAndTimeFlag: false,
        paymentFlag: true
      });
    } else {
      setFormFlagdata({
        addressFlag: true,
        locationAndTimeFlag: false,
        paymentFlag: false
      });
    }
  };

  const prevFromPayment = () => {
    setFormFlagdata({
      addressFlag: false,
      locationAndTimeFlag: true,
      paymentFlag: false
    });
  };

  const finalCall = () => {
    const finalData = {
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
      set_paid: true,
      customer_note: 'ddddddddddddddddddddd',
      billing: {
        first_name: address.first_name,
        last_name: '',
        address_1: address.address_1,
        address_2: `Location: ${locationAndTime.location.label} | Time: ${locationAndTime.time}`,
        city: address.city,
        state: address.state,
        postcode: address.postcode,
        country: address.country,
        email: '',
        phone: address.phone
      },
      line_items: [
        {
          product_id: 93,
          quantity: 2
        },
        {
          product_id: 22,
          variation_id: 23,
          quantity: 1
        }
      ],
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: '10.00'
        }
      ]
    };

    console.log(finalData);
  };

  let cartData = cart_items;
  const unique = [...new Set(cartData.map(item => item.id))];

  const cartTotals = () => {
    let total = 0;
    cart_items.map(item => (total = total + parseFloat(item.price)));
    return total;
  };

  return (
    <div className='checkout'>
      <div className='header'>Express Checkout</div>
      {addressFlag && (
        <AddressDetails user={address ? address : user} addedAddr={addedAddr} />
      )}
      {locationAndTimeFlag && (
        <TimeArea timeArea={timeArea} pin={address.postcode} />
      )}
      {paymentFlag && (
        <div className='multi-step-container'>
          <div className='header'>Order Details</div>
          <div className='order-details-table'>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {unique.map((uniqueItem, idx) => (
                  <tr key={idx}>
                    <td>
                      <img
                        alt=''
                        src={cart_items.filter(x => x.id === uniqueItem)[0].img}
                        className='cart-item img'
                      />
                    </td>
                    <td>
                      {cart_items.filter(x => x.id === uniqueItem)[0].name}
                    </td>
                    <td>
                      {cart_items.filter(x => x.id === uniqueItem)[0].price} /-
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='checkout-total'>
            <b>Cart Totals</b>: {cartTotals()}/-
            <b>Delivery Charge</b>: /-
          </div>
          <button className='btn' onClick={() => prevFromPayment()}>
            Back
          </button>{' '}
          <button className='btn' onClick={() => finalCall()}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth
});

export default connect(mapStateToProps, {})(Checkout);
