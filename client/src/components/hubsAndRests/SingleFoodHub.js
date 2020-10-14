import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoodHubs } from '../../actions/category';
import { connect } from 'react-redux';
import DummyHub from './DummyHub';

const SingleFoodHub = ({
  getFoodHubs,
  category: { categories, loading },
  match
}) => {
  let restros = [
    ...categories.filter(x => x.parent == match.params.id && x.id !== 15)
  ];
  const getRestros = () => {
    restros = categories.filter(
      x => x.parent == match.params.id && x.id !== 15
    );
  };
  useEffect(() => {
    getFoodHubs();
    getRestros();
  }, [getRestros, getFoodHubs]);

  let data = restros;
  const unique = [...new Set(data.map(item => item.description))];

  return loading ? (
    <Fragment>
      <DummyHub />
      <DummyHub />
      <DummyHub />
      <DummyHub />
    </Fragment>
  ) : (
    unique && restros && (
      <Fragment>
        <div className='all-hubs'>
          {unique.map((tag, idx) => (
            <Fragment key={idx}>
              <div className='header'>{tag}</div>
              {restros
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
  getFoodHubs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, {
  getFoodHubs
})(SingleFoodHub);
