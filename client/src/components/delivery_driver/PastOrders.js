import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getCompletedOrdersForDriver } from "../../actions/orders";
import { Link } from "react-router-dom";
import DummyOrders from "../customer/DummyOrders";
import { connect } from "react-redux";
import { useState } from "react";
import Moment from "react-moment";

const PastOrders = ({
  getCompletedOrdersForDriver,
  orders: { completed_orders, loading },
}) => {
  const [offSet, setOffSet] = useState(1);

  useEffect(() => {
    getCompletedOrdersForDriver(offSet);
  }, [getCompletedOrdersForDriver, offSet]);

  const handlePrev = () => {
    //getCompletedOrdersForDriver(--offSet);
    setOffSet(offSet - 1);
  };

  const handleNext = () => {
    //getCompletedOrdersForDriver(++offSet);
    setOffSet(offSet + 1);
  };

  return loading ? (
    <Fragment>
      <div className="delivery-header">
        <h1>Your Past Orders</h1>
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
        <h1>Your Past Orders</h1>
      </div>

      {/* Completed Orders */}
      <div className="table">
        {completed_orders && completed_orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {completed_orders &&
                completed_orders.length > 0 &&
                completed_orders.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td>
                      <Moment format="DD/MM/YYYY">{item.date_completed}</Moment>
                    </td>
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
          <p>No Completed Orders</p>
        )}
        <div className="pginte-sml">
          <button className="btn" onClick={() => handlePrev()}>
            PREV
          </button>
          {"         "}
          <button className="btn" onClick={() => handleNext()}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

PastOrders.propTypes = {
  getCompletedOrdersForDriver: PropTypes.func.isRequired,

  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, {
  getCompletedOrdersForDriver,
})(PastOrders);
