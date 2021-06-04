import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getOrderDetails, changeOrderStatus } from "../../actions/orders";
import { connect } from "react-redux";
import DummyOrders from "../customer/DummyOrders";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const GetOrderDetailsForDriver = ({
  orders: { order },
  getOrderDetails,
  changeOrderStatus,
  match,
}) => {
  useEffect(() => {
    getOrderDetails(match.params.id);
  }, [getOrderDetails, match.params.id]);

  const handleChangeOrderStatus = (status) => {
    changeOrderStatus(match.params.id, status);
  };

  return !order ? (
    <Fragment>
      <DummyOrders />
      <DummyOrders />
      <DummyOrders />
    </Fragment>
  ) : (
    <Fragment>
      <div className="view-order-container">
        <Link to="/delivery-dashboard" className="back-btn">
          {" "}
          <i className="fa fa-chevron-left" /> BACK{" "}
        </Link>
        <div className="order-status-view">
          {order.status === "processing" ? (
            <img src={require("../../static/waiting-to-confirm.gif")} />
          ) : order.status === "driver-assigned" ||
            order.status === "order-confirmed" ? (
            <img src={require("../../static/food-preparing.gif")} />
          ) : order.status === "on-the-way" ? (
            <img src={require("../../static/out-for-delivery.gif")} />
          ) : (
            <img src={require("../../static/completed.gif")} />
          )}
        </div>
        <div className="orders-heading">
          {" "}
          {order.status === "processing" ? (
            "!!! Awaiting to Confirm !!!"
          ) : order.status === "driver-assigned" ||
            order.status === "order-confirmed" ? (
            <Fragment>
              !!! Order Confirmed !!!
              <br />
              !!! Food is being Prepared !!!
            </Fragment>
          ) : order.status === "on-the-way" ? (
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

        <h4>Items</h4>
        <div className="order-items">
          <div className="order-short-details">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.line_items &&
                  order.line_items.map((menu, indx) => (
                    <tr key={indx}>
                      <td>{menu.name}</td>
                      <td>{menu.quantity}</td>
                      <td>{menu.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <h4>Address Details</h4>
        <div className="order-items">
          <div className="order-short-details">
            <strong>Area: </strong> {order.billing && order.billing.address_1}
            <br />
            {order.billing && order.billing.address_2}
            <br />
            <strong>Pincode: </strong>
            {order.billing && order.billing.postcode}
            <br />
          </div>
        </div>
        <h4>Customer Details</h4>
        <div className="order-items">
          <div className="order-short-details">
            <strong>Name: </strong> {order.billing && order.billing.first_name}
            <br />
            <strong>Date: </strong>{" "}
            <Moment format="DD/MM/YYYY HH:mm">
              {order.billing && order.date_created}
            </Moment>
            <br />
            {order.status === "driver-assigned" ||
            order.status === "order-confirmed" ? (
              <Fragment>
                <a
                  className="btn"
                  style={{ width: "100%" }}
                  href={`tel:${order.billing && order.billing.phone}`}
                >
                  Call Customer
                </a>
                <br />
                <button
                  className="btn"
                  onClick={() => handleChangeOrderStatus("out-for-delivery")}
                  style={{ width: "100%" }}
                >
                  Out For Delivery
                </button>
              </Fragment>
            ) : order.status === "on-the-way" ||
              order.status === "out-for-delivery" ? (
              <Fragment>
                <a
                  className="btn"
                  style={{ width: "100%" }}
                  href={`tel:${order.billing && order.billing.phone}`}
                >
                  Call Customer
                </a>
                <br />
                <button
                  className="btn"
                  onClick={() => handleChangeOrderStatus("completed")}
                  style={{ width: "100%" }}
                >
                  Completed
                </button>
              </Fragment>
            ) : (
              `This Order is Marked as ${order.status}`
            )}
            <br />
          </div>
        </div>
        <br />
        <br />
      </div>
    </Fragment>
  );
};

GetOrderDetailsForDriver.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,
  changeOrderStatus: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getOrderDetails,
  changeOrderStatus,
})(GetOrderDetailsForDriver);
