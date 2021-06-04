import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, sendOtp } from "../../actions/auth";

const Login = ({
  login,
  isAuthenticated,
  user,
  sendOtp,
  auth: { otpSend, loginType },
}) => {
  const [formData, setFormData] = useState({
    location: "",
    mobile: "",
    otp: "",
    error: "",
  });

  const { location, mobile, otp, error } = formData;

  const onChange = (e) => {
    if (!isNaN(e.target.value)) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onOTPSubmit = async (e) => {
    e.preventDefault();
    if (location !== "") {
      setFormData({ ...formData, error: "" });
      sendOtp(location, mobile);
    } else {
      setFormData({ ...formData, error: "Please Select and Area.." });
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (location !== "") login(location, mobile, loginType, otp);
  };

  if (isAuthenticated && user) {
    if (user.role === "driver") {
      return <Redirect to="/delivery-dashboard" />;
    } else {
      return <Redirect to="/home" />;
    }
  }

  return (
    !isAuthenticated && (
      <Fragment>
        <div className="login">
          <div className="bg-login">
            <div className="features">
              <span>
                <i className="material-icons">near_me</i> Fast Delivery
              </span>
              <span>
                <i className="material-icons">search</i> Find and Search
              </span>
              <span>
                <i className="material-icons">restaurant</i> Enjoy Food At Home
              </span>
            </div>
          </div>
          {otpSend ? (
            <form className="login-form" onSubmit={(e) => loginSubmit(e)}>
              <p>Enter The OTP Sent on You Mobile Number</p>
              <br />
              <div className="inputs">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => onChange(e)}
                  placeholder="Enter 6 digit OTP ..."
                  required
                  autoFocus
                  maxLength={6}
                  minLength={6}
                />
              </div>
              <footer>
                <button type="submit" className="btn">
                  Continue
                </button>
              </footer>
            </form>
          ) : (
            <form className="login-form" onSubmit={(e) => onOTPSubmit(e)}>
              {/* <img alt='' src={require('../../static/logo.png')} /> */}
              <div className="location-box">
                <div
                  className="location-content"
                  style={
                    location === "Ghatal"
                      ? {
                          boxShadow: "#ff5722de 0px 0px 17px 3px",
                        }
                      : {}
                  }
                  onClick={() =>
                    setFormData({ ...formData, location: "Ghatal" })
                  }
                >
                  <img
                    src={require("../../static/ghatal.svg")}
                    alt="Ghatal Yammy foods"
                    className="loc-img"
                  />
                  <p className="subtitle">Ghatal</p>
                </div>
                <div
                  className="location-content"
                  style={
                    location === "Haldia"
                      ? {
                          boxShadow: "#ff5722de 0px 0px 17px 3px",
                        }
                      : {}
                  }
                  onClick={() =>
                    setFormData({ ...formData, location: "Haldia" })
                  }
                >
                  <img
                    src={require("../../static/haldia.svg")}
                    alt="Ghatal Yammy foods"
                    className="loc-img"
                  />
                  <p className="subtitle">Haldia</p>
                </div>
              </div>
              <br />
              {error && <p className="error">{error}</p>}
              <br />
              <div className="terms-conditions">
                <input type="checkbox" defaultChecked={true} disabled />
                Agreed to <Link to="/privacy-policy">Privacy</Link> and{" "}
                <Link to="/terms-and-conditions">Terms</Link>
              </div>
              <br />
              <div className="inputs">
                <input
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => onChange(e)}
                  placeholder="Mobile No ..."
                  required
                  autoFocus
                  maxLength={10}
                  minLength={10}
                />
              </div>
              <footer>
                <button type="submit" className="btn">
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
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login, sendOtp })(Login);
