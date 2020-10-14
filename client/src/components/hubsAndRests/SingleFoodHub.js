import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoodHubsById } from '../../actions/category';
import { connect } from 'react-redux';
import DummyHub from './DummyHub';

const SingleFoodHub = ({
  getFoodHubsById,
  category: { categories, loading },
  match
}) => {
  useEffect(() => {
    getFoodHubsById(match.params.id);
  }, [getFoodHubsById, match.params.id]);

  let data = categories;
  const unique = [...new Set(data.map(item => item.description))];

  return loading ? (
    <Fragment>
      <DummyHub />
      <DummyHub />
      <DummyHub />
      <DummyHub />
    </Fragment>
  ) : (
    unique && categories && (
      <Fragment>
        <div className='all-hubs'>
          {unique.map((tag, idx) => (
            <Fragment key={idx}>
              <div className='header'>{tag}</div>
              {categories
                .filter(x => x.description == tag)
                .map(item => (
                  <img
                    key={item.id}
                    alt=''
                    src={item.image && item.image.src}
                  />
                ))}
            </Fragment>
          ))}
        </div>
      </Fragment>
    )
  );
};

SingleFoodHub.propTypes = {
  getFoodHubsById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, {
  getFoodHubsById
})(SingleFoodHub);
