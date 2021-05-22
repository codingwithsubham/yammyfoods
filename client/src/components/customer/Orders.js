import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrders } from '../../actions/orders';
import { connect } from 'react-redux';
import DummyOrders from './DummyOrders';
import { Link } from 'react-router-dom';

const Orders = ({ getOrders, orders: { orders, loading } }) => {
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return loading ? (
    <Fragment>
      <div className='orders-heading'>My Orders</div>
      <DummyOrders />
      <DummyOrders />
      <DummyOrders />
    </Fragment>
  ) : (
    orders && (
      <Fragment>
        <div className='orders-container'>
          <div className='orders-heading'>My Orders</div>
          <div className='orders-wrapper'>
            {orders.map(
              (item, idx) =>
                item && (
                  <Fragment key={idx}>
                    <div className='order-items'>
                      {item.status === 'completed' ? (
                        <div className='order-status-completed'>
                          {item.status}
                        </div>
                      ) : (
                        <div className='order-status'>{item.status}</div>
                      )}

                      <div className='order-short-details'>
                        <strong>Order No: </strong> {item.id}
                        <br />
                        <strong>Item Name: </strong>
                        <ul>
                          {item.line_items &&
                            item.line_items.map((menu, indx) => (
                              <li key={indx}>
                                {menu.name} (X {menu.quantity})
                              </li>
                            ))}
                        </ul>
                        <strong>
                          Total: {item.currency_symbol}
                          {item.total}
                        </strong>
                        <br />
                        <strong>Payable By:</strong> {item.payment_method}
                        <br />
                        <br />
                      </div>
                      <Link to={`/view-Order/${item.id}`}>
                        <button className='btn' style={{ width: '100%' }}>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </Fragment>
                )
            )}
          </div>
        </div>
      </Fragment>
    )
  );
};

Orders.propTypes = {
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, {
  getOrders,
})(Orders);
