import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrderDetails } from '../../actions/orders';
import { connect } from 'react-redux';
import DummyOrders from './DummyOrders';
import { Link } from 'react-router-dom';

const ViewOrder = ({ orders: { order }, getOrderDetails, match }) => {
  useEffect(() => {
    getOrderDetails(match.params.id);
  }, [getOrderDetails, match.params.id]);

  return !order ? (
    <Fragment>
      <DummyOrders />
      <DummyOrders />
      <DummyOrders />
    </Fragment>
  ) : (
    <Fragment>
      <div className='view-order-container'>
        <Link to='/orders' className='back-btn'>
          {' '}
          <i className='fa fa-chevron-left' /> BACK{' '}
        </Link>
        <div className='order-status-view'>
          {order.status === 'processing' ? (
            <img src={require('../../static/waiting-to-confirm.gif')} />
          ) : order.status === 'driver-assigned' ||
            order.status === 'order-confirmed' ? (
            <img src={require('../../static/food-preparing.gif')} />
          ) : order.status === 'on-the-way' ? (
            <img src={require('../../static/out-for-delivery.gif')} />
          ) : (
            <img src={require('../../static/completed.gif')} />
          )}
        </div>
        <div className='orders-heading'>
          {' '}
          {order.status === 'processing' ? (
            '!!! Awaiting to Confirm !!!'
          ) : order.status === 'driver-assigned' ||
            order.status === 'order-confirmed' ? (
            <Fragment>
              !!! Order Confirmed !!!
              <br />
              !!! Food is being Prepared !!!
            </Fragment>
          ) : order.status === 'on-the-way' ? (
            <Fragment>
              !!! Food On The Way !!!
              <br />
              !!! Reaching U Soon !!!
            </Fragment>
          ) : (
            order.status
          )}
        </div>
        <div className='order-items'>
          <div className='order-short-details'>
            <strong>Order No: </strong> {order.id}
            <br />
            <strong>Item Name: </strong>
            <ul>
              {order.line_items &&
                order.line_items.map((menu, indx) => (
                  <li key={indx}>
                    {menu.name} (X {menu.quantity})
                  </li>
                ))}
            </ul>
            <strong>
              Total: {order.currency_symbol}
              {order.total}
            </strong>
            <br />
            <strong>Payable By:</strong> {order.payment_method}
            <br />
            <br />
          </div>
        </div>
        {order.driver && (
          <div className='order-items'>
            <strong>Delivery Buddy Details</strong>
            <div className='row'>
              <div className='col-3'>
                <img
                  className='drivr-img'
                  src={order.driver.driver_image}
                  alt='yammyfoods driver'
                />
              </div>
              <div className='col-rest'>
                <div className='drivr-name'>{order.driver.driver_name}</div>
                <strong>Venchile Type : </strong>{' '}
                {order.driver.transportation_type} <br />
                <strong>license plate : </strong> {order.driver.license_plate}{' '}
              </div>
            </div>
            <a
              className='btn'
              style={{ width: '100%' }}
              href={`tel:${order.driver.phone_number}`}
            >
              Call Buddy
            </a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

ViewOrder.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,

  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getOrderDetails,
})(ViewOrder);
