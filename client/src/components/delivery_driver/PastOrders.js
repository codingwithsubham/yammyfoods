import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getCompletedOrdersForDriver } from "../../actions/orders";
import { Link } from "react-router-dom";
import DummyOrders from "../customer/DummyOrders";
import { connect } from "react-redux";
import { useState } from "react";
import Moment from "react-moment";
import Pagination from "../layout/Pagination";

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

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(10);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDatas =
    completed_orders &&
    completed_orders.orders &&
    completed_orders.orders.length > 0 &&
    completed_orders.orders.slice(indexOfFirstData, indexOfLastData);
  //change page
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  //pagination code ends

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
        {currentDatas && currentDatas.length > 0 ? (
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
              {currentDatas &&
                currentDatas.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td>
                      <Moment format="DD/MM/YYYY">
                        {item.date_completed && item.date_completed.date}
                      </Moment>
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
          {completed_orders &&
          completed_orders.orders &&
          completed_orders.orders.length > 0 ? (
            <Pagination
              dataPerPage={dataPerPage}
              totalData={
                completed_orders &&
                completed_orders.orders &&
                completed_orders.orders.length
              }
              paginate={paginate}
              currentPage={currentData}
            />
          ) : (
            <Fragment />
          )}
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
