import React, { Fragment } from 'react';

const SingleProductDummy = () => {
  return (
    <Fragment>
      <div className='product-container'>
        <div className='product-img-dummy' />
        <div className='product-price-dummy'></div>
        <div className='product-bio'>
          <div className='product-name dummy'></div>
          <div className='product-from dummy'></div>
          <div className='product-from rest-card dummy'></div>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleProductDummy;
