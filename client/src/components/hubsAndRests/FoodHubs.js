import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getFoodHubs } from "../../actions/category";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DummyHub from "./DummyHub";
import GoogleAds from "../layout/GoogleAds";

const FoodHubs = ({ getFoodHubs, category: { categories, loading } }) => {
  useEffect(() => {
    getFoodHubs();
  }, [getFoodHubs]);

  return loading ? (
    <Fragment>
      <DummyHub />
      <DummyHub />
    </Fragment>
  ) : (
    categories && (
      <Fragment>
        <div className="all-hubs">
          {categories.map(
            (item) =>
              item.image &&
              item.image.src && (
                <Link key={item.id} to={`/food-hub/${item.id}`}>
                  <img alt="" src={item.image && item.image.src} />
                </Link>
              )
          )}
        </div>
        <div className="header">
          Sponsored <span></span>
        </div>
        <GoogleAds />
      </Fragment>
    )
  );
};

FoodHubs.propTypes = {
  getFoodHubs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {
  getFoodHubs,
})(FoodHubs);
