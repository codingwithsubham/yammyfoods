import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getLatestproducts } from '../../actions/products';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const LatestProductSlider = ({
  getLatestproducts,
  products: { products, loading },
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
        <AliceCarousel
          autoPlay
          autoPlayInterval='3000'
          className='slideshow-container'
        >
          {slider.map((item, idx) => (
            <img
              key={idx}
              alt='Yammy Foods Latest News'
              src={require(`../../sliders/abb${item}.jpg`)}
              style={{ width: '100%' }}
              className='sliderimg'
            />
          ))}
        </AliceCarousel>
      </Fragment>
    ))
  );
};

LatestProductSlider.propTypes = {
  products: PropTypes.object.isRequired,
  getLatestproducts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getLatestproducts })(
  LatestProductSlider
);
