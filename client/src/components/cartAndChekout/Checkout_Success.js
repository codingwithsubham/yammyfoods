import React, { useEffect, Fragment } from 'react';
import { getOrderDetails } from '../../actions/orders';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dummy from './DummyCart';

const Checkout_Success = ({
  getOrderDetails,
  orders: { loading, order },
  match
}) => {
  useEffect(() => {
    getOrderDetails(match.params.id);
  }, [getOrderDetails, match.params.id]);

  return loading ? (
    <Fragment>
      <Dummy />
      <Dummy />
      <Dummy />
      <Dummy />
    </Fragment>
  ) : (
    order && (
      <Fragment>
        <div className='checkout-success'>
          <img
            src={require('../../static/success.gif')}
            alt='yammy foods checkout success'
          />
          <button className='btn'>View Order Status</button>
        </div>
      </Fragment>
    )
  );
};

Checkout_Success.propTypes = {
  orders: PropTypes.object.isRequired,
  getOrderDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(mapStateToProps, { getOrderDetails })(Checkout_Success);
