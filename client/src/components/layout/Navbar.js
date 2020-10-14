import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart } from '../../actions/cart';
import { Link } from 'react-router-dom';

const Navbar = ({ cart: { cart_items }, getCart }) => {
  useEffect(() => {
    getCart('001');
  }, [getCart]);

  return (
    cart_items && (
      <Fragment>
        <nav>
          <div className='nav-upper'>
            <div className='logo'>
              <img alt='' src={require('../../static/logo.png')} />
            </div>
            <div className='location'>
              Ghatal <i className='material-icons'>keyboard_arrow_down</i>
            </div>
          </div>
          <div className='nav-search'>
            <div className='input-wrapper-search'>
              <i className='material-icons'>search</i>
              <input type='text' placeholder='Find Foods ...' />
            </div>
            <Link to='/cart'>
              <i className='material-icons cart-icon'>shopping_basket</i>
              <span className='cart-badge'>{cart_items.length}</span>
            </Link>
          </div>
        </nav>
      </Fragment>
    )
  );
};

Navbar.propTypes = {
  getCart: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, {
  getCart
})(Navbar);
