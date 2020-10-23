import React, { Fragment, useState } from 'react';

const CheckoutAddress = ({ addedAddr, user }) => {
  const [orderDetails, setOrderDetails] = useState({
    first_name: (user && user.first_name) || '',
    address_1: (user && user.address_1) || '',
    city: 'West Bengal',
    state: 'West Bengal',
    postcode: (user && user.postcode) || '',
    country: 'India',
    phone: (user && user.phone) || ''
  });

  const onChange = e => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addedAddr(orderDetails);
  };

  return (
    <Fragment>
      <div className='multi-step-container'>
        <div className='header'>Address Details</div>
        <form onSubmit={e => onSubmit(e)} className='address-box'>
          <div className='checkout-inputs'>
            <span>Full Name</span>
            <input
              type='text'
              name='first_name'
              value={orderDetails.first_name}
              onChange={e => onChange(e)}
              required
              autoFocus={true}
              maxLength={30}
              minLength={30}
            />
            <span>Whats App No</span>
            <input
              type='text'
              name='phone'
              value={orderDetails.phone}
              onChange={e => onChange(e)}
              required
              maxLength={10}
              minLength={10}
            />
            <span>Addredd Info</span>
            <input
              type='text'
              name='address_1'
              value={orderDetails.address_1}
              onChange={e => onChange(e)}
              required
              maxLength={60}
              minLength={60}
            />
            <span>Pincode No</span>
            <input
              type='text'
              name='postcode'
              value={orderDetails.postcode}
              onChange={e => onChange(e)}
              required
              maxLength={6}
              minLength={6}
            />
          </div>
          <button type='submit' className='btn'>
            Next
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CheckoutAddress;
