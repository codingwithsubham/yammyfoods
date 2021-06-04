import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCart } from "../../actions/cart";
import { Link, useLocation, useHistory } from "react-router-dom";

import { openSidebar } from "../../actions/sidebar";

const Navbar = ({
  cart: { cart_items },
  getCart,
  openSidebar,
  sidebar: { open },
  auth: { isAuthenticated, user },
}) => {
  useEffect(() => {
    getCart();
  }, [getCart]);

  const location = useLocation();
  const history = useHistory();

  const sidebarStyle = document.getElementById("sidebar");
  if (sidebarStyle) {
    if (open) {
      sidebarStyle.style.display = "block";
    } else {
      sidebarStyle.style.display = "none";
    }
  }

  return (
    isAuthenticated &&
    cart_items && (
      <Fragment>
        {location.pathname === "/cart" ? (
          <nav>
            <div className="nav-upper">
              <div className="nav-icon" onClick={() => history.goBack()}>
                <i className="material-icons">keyboard_arrow_left</i>
              </div>
              <div className="logo">YOUR BAG</div>

              <Link to="/">
                <i className="material-icons white">home</i>
              </Link>
            </div>
          </nav>
        ) : location.pathname === "/checkout" ? (
          <nav>
            <div className="nav-upper">
              <div className="nav-icon" onClick={() => history.goBack()}>
                <i className="material-icons">keyboard_arrow_left</i>
              </div>
              <div className="logo">EXPRESS CHECKOUT</div>

              <Link to="/">
                <i className="material-icons white">home</i>
              </Link>
            </div>
          </nav>
        ) : (
          <nav>
            <div id="nav-upper" className="nav-upper">
              <div className="nav-icon" onClick={openSidebar}>
                <i className="material-icons">menu</i>
              </div>
              <div className="logo">
                <Link to="/">
                  <img alt="" src={require("../../static/logo.png")} />
                </Link>
              </div>

              <Link to="/cart">
                <i className="material-icons cart-icon">shopping_basket</i>
                <span className="cart-badge">{cart_items.length}</span>
              </Link>
            </div>
          </nav>
        )}
      </Fragment>
    )
  );
};

Navbar.propTypes = {
  getCart: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  cart: state.cart,
  sidebar: state.sidebar,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  openSidebar,
  getCart,
})(Navbar);
