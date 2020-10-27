import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { addToCart, removeFromCart } from '../../actions/cart';

const MenuItems = ({
  product,
  addToCart,
  removeFromCart,
  cart: { cart_items }
}) => {
  const addItems = () => {
    const item = {
      id: product.id,
      name: product.name,
      img: product.images && product.images[0] && product.images[0].src,
      price: product.price,
      ship_class: product.shipping_class_id
    };
    addToCart(item);
  };

  const [qty, setQty] = useState(0);

  if (product && cart_items) {
    if (qty !== cart_items.filter(x => x.id == product.id).length)
      setQty(cart_items.filter(x => x.id == product.id).length);
  }

  const removeItems = () => {
    let removeItem = {
      id: product.id
    };
    removeFromCart(removeItem);
  };

  return (
    product && (
      <Fragment>
        <div className='prdcts-rest'>
          <img
            alt=''
            src={product.images && product.images[0] && product.images[0].src}
          />
          {product.stock_status === 'instock' ? (
            <Fragment />
          ) : (
            <span className='out-of-stock'>Out Of Stock</span>
          )}
          <div className='product-rest-info'>
            <div className='product-rest-bio'>
              <Link to={`/product/${product.id}`}>
                {' '}
                <div className='product-rest-name'>
                  {product && product.name}
                </div>{' '}
              </Link>
              <StarRatings
                rating={parseFloat(product && product.average_rating)}
                starRatedColor='#fff000'
                numberOfStars={5}
                name='rating'
                starDimension='18px'
                starSpacing='1px'
              />
            </div>

            <div className='proce-buttons'>
              <div className='product-rest-price'>
                Rs. {product && product.price}/-
              </div>
              {product.stock_status !== 'instock' ? (
                <button className='qty-group btn' style={{ opacity: 0.4 }}>
                  Add
                </button>
              ) : qty > 0 ? (
                <div className='qty-group'>
                  <button className='btn' onClick={() => removeItems()}>
                    -
                  </button>
                  {qty}
                  <button className='btn' onClick={() => addItems()}>
                    +
                  </button>
                </div>
              ) : (
                <button className='qty-group btn' onClick={() => addItems()}>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

MenuItems.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart
})(MenuItems);
