import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getLatestproducts } from '../../actions/products';
import { connect } from 'react-redux';

const LatestProductSlider = ({
  getLatestproducts,
  products: { products, loading }
}) => {
  useEffect(() => {
    getLatestproducts();
  }, [getLatestproducts]);

  let slider = [1, 2, 3, 4, 5];

  return (
    products &&
    (loading ? (
      <div className='dmy-slider'></div>
    ) : (
      <Fragment>
        <div className='img-slider'>
          {slider.map((item, idx) => (
            <img
              key={idx}
              alt=''
              src={require(`../../sliders/abb${item}.jpg`)}
            />
          ))}
        </div>
      </Fragment>
    ))
  );
};

LatestProductSlider.propTypes = {
  products: PropTypes.object.isRequired,
  getLatestproducts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, { getLatestproducts })(
  LatestProductSlider
);
