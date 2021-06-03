import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getServiceAvailablity,
  getServiceAvailablityNotice,
} from "../../actions/auth";
import { connect } from "react-redux";

const ServiceUnavailable = ({
  getServiceAvailablity,
  getServiceAvailablityNotice,
  auth: { serviceAvailablity, serviceAvailablityNotice },
}) => {
  useEffect(() => {
    getServiceAvailablity();
    getServiceAvailablityNotice();
  }, [getServiceAvailablity, getServiceAvailablityNotice]);

  return (
    serviceAvailablity === "yes" && (
      <Fragment>
        <div className="service-unavailable">
          <img
            className="icon"
            src="https://order.yammyfoods.in/wp-content/uploads/2021/06/16683-closed.gif"
            alt="closed yammy foods"
          />
          <div className="Message">{serviceAvailablityNotice}</div>
          <img
            className="logo-icon"
            src="https://order.b-cdn.net/wp-content/uploads/2019/12/Logo-Main-e1592128542736.png"
            alt="closed yammy foods"
          />
        </div>
      </Fragment>
    )
  );
};

ServiceUnavailable.propTypes = {
  getServiceAvailablity: PropTypes.func.isRequired,
  getServiceAvailablityNotice: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getServiceAvailablity,
  getServiceAvailablityNotice,
})(ServiceUnavailable);
