import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';

const HubsSlider = ({ getFoodHubs, category: { categories } }) => {
  useEffect(() => {
    getFoodHubs();
  }, [getFoodHubs]);
  console.log(categories);

  return (
    categories && (
      <Fragment>
        <div className='hubs-container'>
          {categories.map(item => (
            <img key={item.id} alt='' src={item.image && item.image.src} />
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
