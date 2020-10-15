import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DummyHub from './DummyHub';

const FoodHubs = ({ getFoodHubs, category: { categories, loading } }) => {
  let foodHubs = [
    ...(categories && categories.filter(x => x.parent == 0 && x.id !== 15))
  ];
  const getHubs = () => {
    foodHubs =
      categories && categories.filter(x => x.parent == 0 && x.id !== 15);
  };

  useEffect(() => {
    getHubs();
    getFoodHubs();
  }, [getHubs, getFoodHubs]);

  return loading ? (
    <Fragment>
      <DummyHub />
      <DummyHub />
    </Fragment>
  ) : (
    foodHubs && (
      <Fragment>
        <div className='all-hubs'>
          {foodHubs.map(item => (
            <Link key={item.id} to={`/food-hub/${item.id}`}>
              <img
                alt=''
                src={
                  item.image &&
                  item.image.src.replace(
                    'order.yammyfoods.in',
                    'order.b-cdn.net'
                  )
                }
              />
            </Link>
          ))}
        </div>
      </Fragment>
    )
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
