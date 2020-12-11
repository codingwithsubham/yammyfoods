import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeSidebar } from '../../actions/sidebar';
import { Link } from 'react-router-dom';

const Sidebar = ({
  closeSidebar,
  sidebar: { open },
  auth: { isAuthenticated, user }
}) => {
  const sidebarStyle = document.getElementById('sidebar');
  if (sidebarStyle) {
    if (open) {
      sidebarStyle.style.display = 'block';
    } else {
      sidebarStyle.style.display = 'none';
    }
  }

  return (
    <div id='sidebar' className='sidebar'>
      <div className='sidebar-overlay' onClick={closeSidebar}></div>
      <div className='sidebar-content' onClick={closeSidebar}>
        <div className='profile-area'>
          <i className='material-icons profile-icon'>assignment_ind</i>
          <div className='profile-name'>
            Hi, {user && (user.first_name ? user.first_name : user.username)}
          </div>
          <button className='btn'>Logout </button>
        </div>
        <div className='quick-links'>
          <div className='quick-link-items'>
            <Link to='/orders'>
              <i className='material-icons quick-link-icon'>shopping_basket</i>
              Orders
            </Link>
          </div>

          <div className='quick-link-items'>
            <i className='material-icons quick-link-icon'>account_box</i>
            Account
          </div>
          <div className='quick-link-items'>
            <i className='material-icons quick-link-icon'>
              account_balance_wallet
            </i>
            Wallet
          </div>
        </div>
        <div className='sidebar-links'>
          <Link to='#' className='silebar-link'>
            Addresses
          </Link>
          <br />
          <Link to='#' className='silebar-link'>
            About Us
          </Link>
          <br />
          <Link to='#' className='silebar-link'>
            Privacy Policy
          </Link>
          <br />
          <Link to='#' className='silebar-link'>
            Terms & Conditions
          </Link>
          <br />
        </div>

        <div className='copyright'>
          © Yammy Foods Developed By <br />
          <strong>Subhamp From Infomatric</strong>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  sidebar: state.sidebar,
  auth: state.auth
});

export default connect(mapStateToProps, {
  closeSidebar
})(Sidebar);
