import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CategoryResults = ({ category }) => {
  console.log(category);
  return <div></div>;
};

CategoryResults.propTypes = {
  category: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {})(CategoryResults);
