import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddressDetails from './CheckoutAddress';
import TimeArea from './CheckoutTimeArea';
import { getShipping, checkout } from '../../actions/checkout';
import { Redirect } from 'react-router-dom';

const Checkout = ({
  cart: { cart_items },
  auth: { user },
  getShipping,
  checkout_state: { delivery_charge, checkoutData, loading },
  checkout
}) => {
  const [data, setData] = useState({
    address: null,
    locationAndTime: null,
    shipping: 0,
    payment: null
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

  let cartData = cart_items;
  const unique = [...new Set(cartData.map(item => item.id))];
  const shippingClasses = [...new Set(cartData.map(item => item.ship_class))];

  const cartTotals = () => {
    let total = 0;
    cart_items.map(item => (total = total + parseFloat(item.price)));
    return total;
  };

  const deliveryTotals = () => {
    const data = {
      pin: address && address.postcode,
      ship_class: shippingClasses
    };

    getShipping(data);
    if (!loading) {
      return `${delivery_charge +
        parseInt(
          locationAndTime &&
            locationAndTime.location &&
            locationAndTime.location.value
        )}/-`;
    } else {
      return '...';
    }
  };

  useEffect(() => {
    deliveryTotals();
  }, [deliveryTotals]);

  const totalPrice = () => {
    if (!loading) {
      return `${delivery_charge +
        parseInt(
          locationAndTime &&
            locationAndTime.location &&
            locationAndTime.location.value
        ) +
        cartTotals()}/-`;
    } else {
      return 'Calculating ...';
    }
  };

  const onRadioChange = e => {
    setData({ ...data, payment: e.target.value });
  };

  const finalCall = () => {
    let line_items = [];
    unique.map(uniqueItem => {
      line_items.push({
        product_id: uniqueItem,
        quantity: cart_items.filter(x => x.id === uniqueItem).length
      });
    });

    const finalData = {
      payment_method: 'Cash on delivery',
      payment_method_title: 'Cash on delivery',
      set_paid: true,
      customer_note: locationAndTime.customerNotes,
      customer_id: user.id,
      billing: {
        first_name: address.first_name,
        last_name: '',
        address_1: address.address_1,
        address_2: `Location: ${locationAndTime.location.label} | Time: ${locationAndTime.time}`,
        city: address.city,
        state: address.state,
        postcode: address.postcode,
        country: address.country,
        phone:
          address && address.phone && address.phone.includes('+91')
            ? address.phone
            : `+91${address.phone}`
      },
      line_items: line_items,
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: `${deliveryTotals()}`
        }
      ]
    };

    checkout(finalData);
    const overlayStyle = document.getElementById('overlay');
    if (overlayStyle) {
      overlayStyle.style.display = 'flex';
    }
  };

  if (checkoutData) {
    return <Redirect to={`/checkout/success/${checkoutData.id}`} />;
  }

  return (
    <div className='checkout'>
      <div id='overlay' className='checkout-overlay'>
        <div className='loading-content'>
          <img
            src={require('../../static/load.gif')}
            alt='loading yammy foods'
          />
          <div className='process'>We're Processing Your Order</div>
          <div className='process-sub'>DO NOT PRESS BACK OR HOME</div>
        </div>
      </div>
      {addressFlag && (
        <AddressDetails
          user={address ? address : user && user.billing}
          addedAddr={addedAddr}
        />
      )}
      {locationAndTimeFlag && (
        <TimeArea timeArea={timeArea} pin={address.postcode} />
      )}
      {paymentFlag && (
        <Fragment>
          <div className='order-details-table'>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {unique.map((uniqueItem, idx) => (
                  <tr key={idx}>
                    <td>
                      {cart_items.filter(x => x.id === uniqueItem)[0].name}
                    </td>
                    <td>
                      {cart_items.filter(x => x.id === uniqueItem)[0].price} /-
                    </td>
                    <td>
                      {cart_items.filter(x => x.id === uniqueItem).length}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    Cart Sub Totals:
                    <br />
                    Delivery Base Price:
                    <br />
                    {locationAndTime &&
                      locationAndTime.location &&
                      locationAndTime.location.label}{' '}
                    Price:
                  </td>
                  <td>
                    {cartTotals()}/- <br />
                    {delivery_charge}/- <br />
                    {locationAndTime &&
                      locationAndTime.location &&
                      locationAndTime.location.value}
                    /-
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='checkout-header'>Total Cost: {totalPrice()}</div>
          <div className='time-block'>
            <label className='radio-container'>
              Cash On Delivery
              <input
                type='radio'
                name='radio'
                value='standard'
                onChange={e => onRadioChange(e)}
                defaultChecked
              />
              <span className='checkmark'></span>
            </label>
            <label className='radio-container'>
              Pay Online
              <input
                type='radio'
                name='radio'
                value='custom'
                onChange={e => onRadioChange(e)}
              />
              <span className='checkmark'></span>
            </label>
          </div>
          <div className='cart-final'>
            <button className='btn prev' onClick={() => prevFromPayment()}>
              Back
            </button>
            {!loading ? (
              <button
                className='btn next'
                onClick={e => (!loading ? finalCall() : e.preventDefault())}
              >
                Place Order
              </button>
            ) : (
              <button className='btn next' style={{ opacity: 0.4 }}>
                Calculating
              </button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getShipping: PropTypes.func.isRequired,
  checkout_state: PropTypes.object.isRequired,
  checkout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
  checkout_state: state.checkout
});

export default connect(mapStateToProps, { getShipping, checkout })(Checkout);
