import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getLatestproducts } from '../../actions/products';
import { Carousel } from 'react-responsive-carousel';
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
        <Carousel autoPlay>
          {slider.map((item, idx) => (
            <img
              key={idx}
              alt=''
              src={`https://order.yammyfoods.in/wp-content/uploads/2020/10/bb${item}.jpg`}
            />
          ))}
        </Carousel>
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
