import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import { AREAS, DELIVERY_TIME } from './checkout_areas';

const CheckoutTimeArea = ({ timeArea, pin }) => {
  const [orderDetails, setOrderDetails] = useState({
    location: '',
    time: startTime(DELIVERY_TIME.filter(x => x.pin == pin)[0].time + 20),
    customTime: false,
    customerNotes: ''
  });

  const [error, setError] = useState(false);

  const onChange = e => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    setError(false);
  };

  const onRadioChange = e => {
    if (e.target.value === 'standard') {
      setOrderDetails({ ...orderDetails, customTime: false });
    } else {
      setOrderDetails({ ...orderDetails, time: '', customTime: true });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (orderDetails.location) {
      timeArea(orderDetails, true);
    } else {
      setError(true);
    }
  };

  const onPrevAction = () => {
    timeArea(orderDetails, false);
  };

  let options = [];
  AREAS.forEach(item => {
    return item.pin == pin
      ? (options = [...item.areas])
      : (options = [...options]);
  });

  function startTime(addingTime) {
    let today = new Date();
    today.setMinutes(today.getMinutes() + addingTime);
    let h = today.getHours();
    let m = today.getMinutes();
    let pm = false;
    setTimeout(function() {
      startTime();
    }, 500);
    if (h > 11) {
      h = h - 12;
      pm = true;
    }
    if (h == 0) h = 12;
    if (m.length == 1) m = '0' + m;
    return h + ':' + m + '' + (pm ? 'pm' : 'am');
  }

  return (
    <Fragment>
      <div className='multi-step-container'>
        <div className='header'>Additional Details</div>
        <form onSubmit={e => onSubmit(e)} className='address-box'>
          <div className='checkout-inputs'>
            <h5>Select Your Area</h5>

            <Select
              closeMenuOnSelect={false}
              options={options}
              onChange={e => {
                setOrderDetails({ ...orderDetails, location: e });
                setError(false);
              }}
              placeholder={'Select Your Area'}
              className={error ? 'required' : 'select'}
            />
            {error && <div className='err'>Please Select an Area</div>}
            <Fragment>
              <span>Order Notes</span>
              <input
                type='text'
                name='customerNotes'
                value={orderDetails.customerNotes}
                onChange={e => onChange(e)}
                maxLength={50}
                minLength={2}
              />
            </Fragment>

            <h5>Select Time Span</h5>
            <div className='time-block'>
              <label className='radio-container'>
                Standard Delivery Time
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
                Choose Custom Time
                <input
                  type='radio'
                  name='radio'
                  value='custom'
                  onChange={e => onRadioChange(e)}
                />
                <span className='checkmark'></span>
              </label>
            </div>

            {orderDetails.customTime ? (
              <Fragment>
                <span>Please Mention The Time</span>
                <input
                  type='text'
                  name='time'
                  value={orderDetails.time}
                  onChange={e => onChange(e)}
                  required
                  maxLength={10}
                  minLength={3}
                />
              </Fragment>
            ) : (
              <div className='delivery-time'>
                <b>Delivery Time:</b>
                {startTime(DELIVERY_TIME.filter(x => x.pin == pin)[0].time)}
                {' - '}
                {startTime(
                  DELIVERY_TIME.filter(x => x.pin == pin)[0].time + 30
                )}
              </div>
            )}
          </div>
          <div className='cart-final'>
            <button onClick={() => onPrevAction()} className='btn prev'>
              Prev
            </button>
            <button type='submit' className='btn next'>
              Next
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CheckoutTimeArea;
