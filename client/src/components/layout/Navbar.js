import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart } from '../../actions/cart';
import { Link } from 'react-router-dom';
import { openSidebar } from '../../actions/sidebar';

const Navbar = ({
  cart: { cart_items },
  getCart,
  openSidebar,
  sidebar: { open }
}) => {
  useEffect(() => {
    getCart('001');
  }, [getCart]);

  const sidebarStyle = document.getElementById('sidebar');
  if (sidebarStyle) {
    if (open) {
      sidebarStyle.style.display = 'block';
    } else {
      sidebarStyle.style.display = 'none';
    }
  }

  function scrollFunction() {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      document.getElementById('nav-upper').style.display = 'none';
      document.getElementById('nav-search').style.paddingTop = '12px';
    } else {
      document.getElementById('nav-upper').style.display = 'flex';
      document.getElementById('nav-search').style.paddingTop = '0px';
    }
  }
  window.onscroll = function() {
    scrollFunction();
  };
  return (
    cart_items && (
      <Fragment>
        <nav>
          <div id='nav-upper' className='nav-upper'>
            <div className='nav-icon' onClick={openSidebar}>
              <i className='material-icons'>menu</i>
            </div>
            <div className='logo'>
              <img alt='' src={require('../../static/logo.png')} />
            </div>
            <div className='location'>
              Ghatal <i className='material-icons'>keyboard_arrow_down</i>
            </div>
          </div>
          <div id='nav-search' className='nav-search'>
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
  getCart: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  cart: state.cart,
  sidebar: state.sidebar
});

export default connect(mapStateToProps, {
  openSidebar,
  getCart
})(Navbar);
