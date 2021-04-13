import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getLatestproducts } from '../../actions/products';
import { connect } from 'react-redux';
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';

const LatestProductSlider = ({
  getLatestproducts,
  products: { products, loading }
}) => {
  useEffect(() => {
    getLatestproducts();
  }, [getLatestproducts]);

  //let slider = [1, 2, 3, 4, 5];

  return (
    products &&
    (loading ? (
      <div className='dmy-slider'></div>
    ) : (
      <Fragment>
        <div className='slideshow-container'>
          <img
            alt='Yammy Foods Latest News'
            src={require(`../../sliders/abb.gif`)}
            style={{ width: '100%' }}
            className='sliderimg'
          />
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
