import React, { useEffect } from "react";
import LatestProductSlider from "./LatestProductSlider";
import CategorySlider from "./CategorySlider";
import LatestProducts from "../all_products/LatestProducts";
import HubsSlider from "../dashboard/HubsSlider";
import GlobalMessage from "../layout/GlobalMessage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PullToRefresh from "react-simple-pull-to-refresh";
import {
  getServiceAvailablity,
  getServiceAvailablityNotice,
} from "../../actions/auth";

const Dashboard = ({ getServiceAvailablity, getServiceAvailablityNotice }) => {
  useEffect(() => {
    getServiceAvailablity();
    getServiceAvailablityNotice();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <PullToRefresh onRefresh={handleRefresh}>
        <LatestProductSlider />
      </PullToRefresh>

      <GlobalMessage />
      <div className="header">
        Find By Category <span>View All</span>
      </div>
      <CategorySlider />
      <div className="header">
        Hubs Near You <span>View All</span>
        <HubsSlider />
      </div>
      <div className="header">
        New Arrivals <span>View All</span>
      </div>
      <LatestProducts />
    </div>
  );
};

Dashboard.propTypes = {
  getServiceAvailablity: PropTypes.func.isRequired,
  getServiceAvailablityNotice: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  getServiceAvailablity,
  getServiceAvailablityNotice,
})(Dashboard);
