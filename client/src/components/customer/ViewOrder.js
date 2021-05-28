import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getOrderDetails } from "../../actions/orders";
import { connect } from "react-redux";
import DummyOrders from "./DummyOrders";
import { Link } from "react-router-dom";
import RateFood from "./RateFood";

const ViewOrder = ({ orders: { order }, getOrderDetails, match }) => {
  useEffect(() => {
    getOrderDetails(match.params.id);
  }, [getOrderDetails, match.params.id]);

  return !order ? (
    <Fragment>
      <DummyOrders />
      <DummyOrders />
      <DummyOrders />
    </Fragment>
  ) : (
    <Fragment>
      <div className="view-order-container">
        <Link to="/orders" className="back-btn">
          {" "}
          <i className="fa fa-chevron-left" /> BACK{" "}
        </Link>
        <div className="order-status-view">
          {order.status === "processing" ? (
            <img src={require("../../static/waiting-to-confirm.gif")} />
          ) : order.status === "driver-assigned" ? (
            <img src={require("../../static/food-preparing.gif")} />
          ) : order.status === "out-for-delivery" ? (
            <img src={require("../../static/out-for-delivery.gif")} />
          ) : (
            <img src={require("../../static/completed.gif")} />
          )}
        </div>
        <div className="orders-heading">
          {" "}
          {order.status === "processing" ? (
            "!!! Awaiting to Confirm !!!"
          ) : order.status === "driver-assigned" ? (
            <Fragment>
              !!! Order Confirmed !!!
              <br />
              !!! Food is being Prepared !!!
            </Fragment>
          ) : order.status === "out-for-delivery" ? (
            <Fragment>
              !!! Food On The Way !!!
              <br />
              !!! Reaching U Soon !!!
            </Fragment>
          ) : (
            order.status
          )}
        </div>
        <div className="order-items">
          <div className="order-short-details">
            <strong>Order No: </strong> {order.id}
            <br />
            <strong>Item Name: </strong>
            <ul>
              {order.line_items &&
                order.line_items.map((menu, indx) => (
                  <li key={indx}>
                    {menu.name} (X {menu.quantity})
                  </li>
                ))}
            </ul>
            <strong>
              Total: {order.currency_symbol}
              {order.total}
            </strong>
            <br />
            <strong>Payable By:</strong> {order.payment_method}
            <br />
            <br />
          </div>
        </div>
        {order.status === "completed" &&
          order.customer_note !== "rating-submitted" && (
            <Fragment>
              {" "}
              <div className="orders-heading"> Please rate Your Food </div>
              <div className="order-items">
                <div className="order-short-details rating">
                  {order.line_items &&
                    order.line_items.map((menu, indx) => (
                      <RateFood
                        menu={menu}
                        indx={indx}
                        key={`rat-${indx}`}
                        order_id={order.id}
                      />
                    ))}
                </div>
              </div>
            </Fragment>
          )}
        {order.driver && order.driver.driver_id && (
          <div className="order-items">
            <strong>Delivery Buddy Details</strong>
            <div className="row">
              <div className="col-3">
                <img
                  className="drivr-img"
                  src={
                    order.driver.driver_image ||
                    "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                  }
                  alt="yammyfoods driver"
                />
              </div>
              <div className="col-rest">
                <div className="drivr-name">{order.driver.driver_name}</div>
                <strong>Venchile Type : </strong>{" "}
                {order.driver.transportation_type} <br />
                <strong>license plate : </strong> {order.driver.license_plate}{" "}
              </div>
            </div>
            {order.status === "out-for-delivery" && (
              <a
                className="btn"
                style={{ width: "100%" }}
                href={`tel:${order.driver.phone_number}`}
              >
                Call Buddy
              </a>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

ViewOrder.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,

  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getOrderDetails,
})(ViewOrder);
