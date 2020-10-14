import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeSidebar } from '../../actions/sidebar';

const Sidebar = ({ closeSidebar, sidebar: { open } }) => {
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
      <div className='sidebar-content'></div>
    </div>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  sidebar: state.sidebar
});

export default connect(mapStateToProps, {
  closeSidebar
})(Sidebar);
