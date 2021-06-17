import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCart, addToCart, removeFromCart } from "../../actions/cart";
import DummyCart from "./DummyCart";
import { Link } from "react-router-dom";
import {
  getServiceAvailablity,
  getServiceAvailablityNotice,
} from "../../actions/auth";

const Cart = ({
  cart: { cart_items, loading },
  getCart,
  addToCart,
  removeFromCart,
  getServiceAvailablity,
  getServiceAvailablityNotice,
}) => {
  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    getServiceAvailablity();
    getServiceAvailablityNotice();
  }, []);

  let data = cart_items;
  const unique = [...new Set(data.map((item) => item.id))];

  const addItems = (product) => {
    const item = {
      id: product.id,
      name: product.name,
      img: product.img,
      price: product.price,
      ship_class: product.shipping_class_id,
    };
    addToCart(item);
  };

  const removeItems = (product) => {
    let removeItem = {
      id: product.id,
    };
    removeFromCart(removeItem);
  };

  const cartTotals = () => {
    let total = 0;
    cart_items.map((item) => (total = total + parseFloat(item.price)));
    return total;
  };

  return loading ? (
    <Fragment>
      <DummyCart />
      <DummyCart />
    </Fragment>
  ) : cart_items.length <= 0 ? (
    <div className="cart-empty">
      <div style={{ textAlign: "center" }}>
        <i className="material-icons">remove_shopping_cart</i>
        <h1> Your Bag is Empty</h1>
      </div>
    </div>
  ) : (
    unique && (
      <div className="cart">
        {unique.map((uniqueItem, idx) => (
          <div className="cart-row" key={idx}>
            <img
              alt=""
              src={cart_items.filter((x) => x.id === uniqueItem)[0].img}
              className="cart-item img"
            />
            <div className="cart-item name">
              {cart_items.filter((x) => x.id === uniqueItem)[0].name}
              <br />
              <b>
                Rs. {cart_items.filter((x) => x.id === uniqueItem)[0].price} /-
              </b>
              <br />
              <div className="qty-group">
                <button
                  className="btn"
                  onClick={() =>
                    removeItems(
                      cart_items.filter((x) => x.id === uniqueItem)[0]
                    )
                  }
                >
                  -
                </button>
                <span>
                  {cart_items.filter((x) => x.id === uniqueItem).length}
                </span>
                <button
                  className="btn"
                  onClick={() =>
                    addItems(cart_items.filter((x) => x.id === uniqueItem)[0])
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="cart-final">
          <div className="cart-total">
            <span>Subtotal:</span>
            <span>Rs. {cartTotals()}/-</span>
          </div>
          {cartTotals() > 90 ? (
            <Link to="/checkout">
              <button className="btn">Proceed</button>
            </Link>
          ) : (
            <Link>
              <button className="btn" style={{ opacity: 0.5 }}>
                Please Add More {90 - cartTotals()} Rs. to checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    )
  );
};

Cart.propTypes = {
  getServiceAvailablity: PropTypes.func.isRequired,
  getServiceAvailablityNotice: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  getCart,
  addToCart,
  removeFromCart,
  getServiceAvailablity,
  getServiceAvailablityNotice,
})(Cart);
