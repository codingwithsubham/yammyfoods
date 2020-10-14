import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductById } from '../../actions/products';
import StarRatings from 'react-star-ratings';
import SingleProductDummy from './SingleProductDummy';
import { addToCart, removeFromCart } from '../../actions/cart';

const SingleProducts = ({
  match,
  getProductById,
  products: { product, loading },
  addToCart,
  removeFromCart,
  cart: { cart_items }
}) => {
  useEffect(() => {
    getProductById(match.params.id);
  }, [getProductById, match.params.id]);

  const addItems = () => {
    const item = {
      user: '001',
      id: product.id,
      name: product.name,
      img: product.images && product.images[0] && product.images[0].src,
      price: product.price
    };
    addToCart(item);
  };

  const removeItems = () => {
    let removeItem = {
      user: '001',
      id: product.id
    };
    removeFromCart(removeItem);
  };

  const [qty, setQty] = useState(0);

  if (product && cart_items) {
    if (qty !== cart_items.filter(x => x.id == product.id).length)
      setQty(cart_items.filter(x => x.id == product.id).length);
  }

  return loading || !product ? (
    <SingleProductDummy />
  ) : (
    <Fragment>
      <div className='product-container'>
        <img
          className='product-img'
          alt=''
          src={product.images && product.images[0] && product.images[0].src}
        />
        <div className='product-price'>Rs. {product && product.price}/-</div>
        <div className='product-bio'>
          <div className='product-name'>{product && product.name}</div>
          <StarRatings
            rating={parseFloat(product && product.average_rating)}
            starRatedColor='#fff000'
            numberOfStars={5}
            name='rating'
            starDimension='25px'
            starSpacing='2px'
          />{' '}
          <span>
            {' '}
            - {product && product.average_rating}
            {parseFloat(product && product.average_rating) > 0
              ? ' Rating Till Now'
              : ' No Ratings yet'}
          </span>
          {qty > 0 ? (
            <div className='qty-group'>
              <button className='btn' onClick={() => removeItems()}>
                -
              </button>
              {qty}{' '}
              <button className='btn' onClick={() => addItems()}>
                +
              </button>
            </div>
          ) : (
            <div className='qty-group'>
              <button className='btn' onClick={() => addItems()}>
                Add to Bag +
              </button>
            </div>
          )}
          <div className='product-from rest-card'>
            {product && product.categories && product.categories[0].name}
            <div className='tags-holder'>
              {product &&
                product.tags &&
                product.tags.map((tag, idx) => (
                  <span key={idx}>&#9733; {tag.name}</span>
                ))}
            </div>
          </div>
          <p>
            {product.description
              .replace('<p>', '')
              .replace('</p>')
              .substring(1, 100)}
            ...
          </p>
        </div>
      </div>
    </Fragment>
  );
};

SingleProducts.propTypes = {
  getProductById: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart
});

export default connect(mapStateToProps, {
  getProductById,
  addToCart,
  removeFromCart
})(SingleProducts);
