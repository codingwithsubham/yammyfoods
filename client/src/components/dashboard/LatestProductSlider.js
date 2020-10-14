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

  return (
    products &&
    (loading ? (
      <div className='dmy-slider'></div>
    ) : (
      <Fragment>
        <Carousel autoPlay>
          {products.map((product, idx) => (
            <div key={idx}>
              <img
                alt=''
                src={
                  product.images && product.images[0] && product.images[0].src
                }
              />
              <div className='product-bio legend'>
                <div className='product-name'>{product && product.name}</div>
                <div className='product-price'>
                  Rs. {product && product.price}/-
                </div>
                <div className='product-from'>
                  {product && product.categories && product.categories[0].name}
                </div>
              </div>
            </div>
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
