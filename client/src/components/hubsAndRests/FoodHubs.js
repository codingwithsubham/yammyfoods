import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';

const FoodHubs = ({ getFoodHubs, category }) => {
  useEffect(() => {
    getFoodHubs();
  }, [getFoodHubs]);
  console.log(category);

  return (
    <Fragment>
      <h1>food hub</h1>
    </Fragment>
  );
};

FoodHubs.propTypes = {
  getFoodHubs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, {
  getFoodHubs
})(FoodHubs);
