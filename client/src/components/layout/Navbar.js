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
  sidebar: { open },
  auth: { isAuthenticated, user }
}) => {
  useEffect(() => {
    getCart();
  }, [getCart]);

  const sidebarStyle = document.getElementById('sidebar');
  if (sidebarStyle) {
    if (open) {
      sidebarStyle.style.display = 'block';
    } else {
      sidebarStyle.style.display = 'none';
    }
  }

  let prevScrollpos = window.pageYOffset;

  if (isAuthenticated) {
    window.onscroll = function() {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('nav-upper').style.display = 'flex';
      } else {
        document.getElementById('nav-upper').style.display = 'none';
      }
      prevScrollpos = currentScrollPos;
    };
  }

  return (
    isAuthenticated &&
    cart_items && (
      <Fragment>
        <nav>
          <div id='nav-upper' className='nav-upper'>
            <div className='nav-icon' onClick={openSidebar}>
              <i className='material-icons'>menu</i>
            </div>
            <div className='logo'>
              <Link to='/'>
                <img alt='' src={require('../../static/logo.png')} />
              </Link>
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
  sidebar: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  cart: state.cart,
  sidebar: state.sidebar,
  auth: state.auth
});

export default connect(mapStateToProps, {
  openSidebar,
  getCart
})(Navbar);
