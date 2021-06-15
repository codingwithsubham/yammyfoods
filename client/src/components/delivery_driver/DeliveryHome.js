import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAssignedOrdersForDriver,
  getMarkedOrdersForDriver,
} from "../../actions/orders";
import { Link } from "react-router-dom";
import DummyOrders from "../customer/DummyOrders";
import { connect } from "react-redux";

const DeliveryHome = ({
  getAssignedOrdersForDriver,
  getMarkedOrdersForDriver,
  orders: { assigned_orders, marked_orders, loading },
}) => {
  useEffect(() => {
    getAssignedOrdersForDriver();
  }, [getAssignedOrdersForDriver]);

  useEffect(() => {
    getMarkedOrdersForDriver();
  }, [getMarkedOrdersForDriver]);

  return loading ? (
    <Fragment>
      <div className="delivery-header">
        <h1>Delivery Buddy Home</h1>
        <p>
          All in one stop place to manage all the deliveries that got assigned.
        </p>
      </div>
      <DummyOrders />
      <DummyOrders />
      <DummyOrders />
    </Fragment>
  ) : (
    <div className="delivery-home">
      <div className="refresh-btn" onClick={() => window.location.reload()}>
        <i className="material-icons refresh">refresh</i>
      </div>
      <div className="delivery-header">
        <h1>Delivery Buddy Home</h1>
        <p>
          All in one stop place to manage all the deliveries that got assigned.
        </p>
      </div>
      <div className="table">
        <h1>Assigned Orders</h1>
        {assigned_orders && assigned_orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assigned_orders &&
                assigned_orders.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`/order-details-delivery/${item.id}`}>
                        <button className="btn">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No Assigned Orders</p>
        )}
      </div>
      {/* for marked orders */}
      <div className="table">
        <h1>Marked Orders</h1>
        {marked_orders && marked_orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {marked_orders &&
                marked_orders.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`/order-details-delivery/${item.id}`}>
                        <button className="btn">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No Marked Orders</p>
        )}
        <Link to="/delivery-view-past-orders" className="btn">
          View Past Orders
        </Link>
      </div>
    </div>
  );
};

DeliveryHome.propTypes = {
  getAssignedOrdersForDriver: PropTypes.func.isRequired,
  getMarkedOrdersForDriver: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, {
  getAssignedOrdersForDriver,
  getMarkedOrdersForDriver,
})(DeliveryHome);
