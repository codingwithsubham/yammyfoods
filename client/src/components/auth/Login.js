import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, sendOtp } from '../../actions/auth';

const Login = ({
  login,
  isAuthenticated,
  user,
  sendOtp,
  auth: { otpSend, loginType }
}) => {
  const [formData, setFormData] = useState({
    contrycode: '+91',
    mobile: '',
    otp: ''
  });

  const { contrycode, mobile, otp } = formData;

  const onChange = e => {
    if (!isNaN(e.target.value)) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onOTPSubmit = async e => {
    e.preventDefault();
    sendOtp(contrycode, mobile);
  };

  const loginSubmit = async e => {
    e.preventDefault();
    login(contrycode, mobile, loginType, otp);
  };

  if (isAuthenticated && user) {
    return <Redirect to='/' />;
  }

  return (
    !isAuthenticated && (
      <Fragment>
        <div className='login'>
          <div className='bg-login'>
            <div className='features'>
              <span>
                <i className='material-icons'>near_me</i> Fast Delivery
              </span>
              <span>
                <i className='material-icons'>search</i> Find and Search
              </span>
              <span>
                <i className='material-icons'>restaurant</i> Enjoy Food At Home
              </span>
            </div>
          </div>
          {otpSend ? (
            <form className='login-form' onSubmit={e => loginSubmit(e)}>
              <img alt='' src={require('../../static/logo.png')} />
              <p>Enter The OTP Send to Your Mobile Number</p>
              <div className='inputs'>
                <input
                  type='text'
                  name='otp'
                  value={otp}
                  onChange={e => onChange(e)}
                  placeholder='Enter 6 digit OTP ...'
                  required
                  autoFocus
                  maxLength={6}
                  minLength={6}
                />
              </div>
              <footer>
                <button type='submit' className='btn'>
                  Continue
                </button>
              </footer>
            </form>
          ) : (
            <form className='login-form' onSubmit={e => onOTPSubmit(e)}>
              <img alt='' src={require('../../static/logo.png')} />
              <p>Enter Your Mobile No</p>
              <div className='inputs'>
                <input
                  type='text'
                  name='mobile'
                  value={mobile}
                  onChange={e => onChange(e)}
                  placeholder='Mobile No ...'
                  required
                  autoFocus
                  maxLength={10}
                  minLength={10}
                />
              </div>
              <footer>
                <button type='submit' className='btn'>
                  Continue
                </button>
              </footer>
            </form>
          )}
        </div>
      </Fragment>
    )
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  sendOtp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps, { login, sendOtp })(Login);
