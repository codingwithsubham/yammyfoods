import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Checkout_Success = ({}) => {
  return (
    <Fragment>
      <div className="checkout-success">
        <img
          src={
            "https://order.yammyfoods.in/wp-content/uploads/2021/05/success-green-check-mark.png"
          }
          alt="yammy foods checkout success"
        />
        <h3>Order Placed</h3>
        <Link to="/orders">
          <button className="btn">View Order Status</button>
        </Link>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Checkout_Success);
