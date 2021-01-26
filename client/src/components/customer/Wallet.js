import React from 'react';
import PropTypes from 'prop-types';
import { getWalletBalance } from '../../actions/wallet';
import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

const Wallet = ({ getWalletBalance }) => {
  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);

  return (
    <Fragment>
      <h1>This is my Wallet</h1>
    </Fragment>
  );
};

Wallet.propTypes = {
  getWalletBalance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, {
  getWalletBalance,
})(Wallet);
