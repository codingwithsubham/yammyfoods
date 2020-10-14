import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, user }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated && user) {
    console.log('kkkkkkkkkk');
  }

  return (
    <Fragment>
      <div className='container landing'>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-3'>
            <div className='card'>
              <div className='logo-container-s'>
                {/* <!-- <img src="../images/logo1.jpg" alt="liNk logo" className="img-logo" /> --> */}
              </div>
              <h1 style={{ fontSize: '40px' }}>Sign In</h1>
              <h4 style={{ fontSize: '20px' }}>Use your Infinite Account</h4>

              <div className='form-container'>
                {/* <!-- form --> */}
                <form onSubmit={e => onSubmit(e)}>
                  <div className='input-container'>
                    <i className='fa fa-envelope icon'></i>
                    <div className='group'>
                      <input
                        type='text'
                        name='email'
                        value={email}
                        minLength='2'
                        onChange={e => onChange(e)}
                        autoComplete='flase'
                        required
                      />
                      <label>Email/Username</label>
                    </div>
                  </div>
                  <div className='input-container'>
                    <i className='fa fa-key icon'></i>
                    <div className='group'>
                      <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='2'
                        autoComplete='false'
                        required
                      />
                      <label>Password</label>
                    </div>
                  </div>
                  {/* <!-- button --> */}
                  <button
                    type='submit'
                    className='btn ripple'
                    style={{ fontSize: '17px' }}
                  >
                    Sign In
                  </button>
                </form>
                {/* <!-- form ENd --> */}
              </div>
            </div>
            <div
              className='row'
              style={{ textAlign: 'center', marginLeft: '6%' }}
            >
              <p style={{ fontSize: '14px' }}>
                Copyright © 2020 Infinite Computer Solution (India) Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);
