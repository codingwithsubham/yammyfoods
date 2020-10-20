import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DummyHub from '../hubsAndRests/DummyHub';

const HubsSlider = ({ getFoodHubs, category: { categories, loading } }) => {
  useEffect(() => {
    getFoodHubs();
  }, [getFoodHubs]);

  return loading ? (
    <div className='hubs-container'>
      <DummyHub />
    </div>
  ) : (
    categories && (
      <Fragment>
        <div className='hubs-container'>
          {categories.map(item => (
            <Link key={item.id} to={`/food-hub/${item.id}`}>
              <img alt='' src={item.image && item.image.src} />
            </Link>
          ))}
        </div>
      </Fragment>
    )
  );
};

HubsSlider.propTypes = {
  getFoodHubs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, {
  getFoodHubs
})(HubsSlider);
