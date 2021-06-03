import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getGlobalNotice } from "../../actions/auth";
import { connect } from "react-redux";

const GlobalMessage = ({ getGlobalNotice, auth: { globalNotice } }) => {
  useEffect(() => {
    getGlobalNotice();
  }, [getGlobalNotice]);

  return (
    globalNotice && (
      <Fragment>
        <div className="global-message">
          <div className="Message">{globalNotice}</div>
          <div className="salutation">~ Team Yammy Foods.</div>
        </div>
      </Fragment>
    )
  );
};

GlobalMessage.propTypes = {
  getGlobalNotice: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getGlobalNotice,
})(GlobalMessage);
