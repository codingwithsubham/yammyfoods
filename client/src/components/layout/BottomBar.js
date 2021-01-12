import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const BottomBar = ({ auth: { isAuthenticated } }) => {
  return (
    isAuthenticated && (
      <Fragment>
        <div className='bottom-bar'>
          <ul>
            <li>
              <NavLink to='/home'>
                <i className='material-icons bttm-icon'>home</i>
                <div>Home</div>
              </NavLink>
            </li>

            <li>
              <i className='material-icons bttm-icon'>search</i>
              <div>Search</div>
            </li>

            <li className='center-item'>
              <NavLink to='/food-hubs'>
                <i className='material-icons bttm-icon'>restaurant_menu</i>
                <div>Food</div>
              </NavLink>
            </li>

            <li>
              <i className='material-icons bttm-icon'>message</i>
              <div>Message</div>
            </li>

            <li>
              <i className='material-icons bttm-icon'>call</i>
              <div>Call</div>
            </li>
          </ul>
        </div>
      </Fragment>
    )
  );
};

BottomBar.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(BottomBar);
