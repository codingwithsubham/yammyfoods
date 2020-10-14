import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const BottomBar = () => {
  return (
    <Fragment>
      <div className='bottom-bar'>
        <ul>
          <li>
            <NavLink to='/'>
              <i className='material-icons bttm-icon'>home</i>
              <div>Home</div>
            </NavLink>
          </li>

          <li>
            <i className='material-icons bttm-icon'>account_circle</i>
            <div>Account</div>
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
  );
};

export default BottomBar;
