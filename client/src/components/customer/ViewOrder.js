import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrderDetails } from '../../actions/orders';
import { getDeliveryBoy } from '../../actions/auth';
import { connect } from 'react-redux';

const ViewOrder = ({
  orders: { order },
  getOrderDetails,
  getDeliveryBoy,
  auth: { delivery_boy, loading },
  match
}) => {
  useEffect(() => {
    getOrderDetails(match.params.id);
  }, [getOrderDetails, match.params.id]);

  console.log(order && order);
  console.log(delivery_boy && delivery_boy);

  let deliveryBoyId =
    order &&
    order.meta_data &&
    order.meta_data.filter(x => x.key === 'ddwc_driver_id')[0];

  // if (!loading) {
  //   if (delivery_boy === null) {
  //     if (deliveryBoyId !== null) {
  //       getDeliveryBoy(deliveryBoyId.value);
  //     }
  //   }
  // }

  return (
    order && (
      <Fragment>
        <div className='view-order-container'>
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
          <div className='orders-heading'>{order.status}</div>
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
          {/* <div className='order-items'>
          <strong>Delivery Buddy Details</strong>

          </div> */}
        </div>
      </Fragment>
    )
  );
};

ViewOrder.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,
  getDeliveryBoy: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getOrderDetails,
  getDeliveryBoy
})(ViewOrder);
