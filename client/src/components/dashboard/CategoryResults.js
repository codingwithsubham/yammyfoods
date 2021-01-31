import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CategoryResults = () => {
  return <div></div>;
};

CategoryResults.propTypes = {
  products: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {})(CategoryResults);
