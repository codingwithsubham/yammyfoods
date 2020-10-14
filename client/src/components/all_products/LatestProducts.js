import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLatestproducts } from '../../actions/products';
import ProductsCard from './ProductsCard';
import LoadingProducts from './LoadingProducts';

const LatestProducts = ({
  getLatestproducts,
  products: { products, loading }
}) => {
  useEffect(() => {
    getLatestproducts();
  }, [getLatestproducts]);

  return loading ? (
    <div className='dummy-products'>
      <div className='prdct-crd-cntnr'>
        <LoadingProducts />
        <LoadingProducts />
        <LoadingProducts />
        <LoadingProducts />
        <LoadingProducts />
        <LoadingProducts />
      </div>
    </div>
  ) : (
    <Fragment>
      <div className='prdct-crd-cntnr'>
        {products &&
          products.map((product, idx) => (
            <ProductsCard product={product} key={idx} />
          ))}
      </div>
    </Fragment>
  );
};

LatestProducts.propTypes = {
  products: PropTypes.object.isRequired,
  getLatestproducts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, { getLatestproducts })(LatestProducts);
