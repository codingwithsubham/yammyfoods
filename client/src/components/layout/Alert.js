import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className='alert-container'>
      {alert.alertType === 'success' ? (
        <div className='box-alert' style={{ backgroundColor: 'green' }}>
          <i className='fa fa-bell' /> {alert.msg}
        </div>
      ) : (
        <div className='box-alert' style={{ backgroundColor: 'red' }}>
          <i className='fa fa-bell' /> {alert.msg}
        </div>
      )}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
