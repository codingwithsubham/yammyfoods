import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { submitRating } from "../../actions/products";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";

const RateFood = ({ menu, auth: { user }, indx, order_id, submitRating }) => {
  const [formData, setFormData] = useState({
    product_id: menu ? menu.product_id : "",
    review: "",
    reviewer: user ? user.first_name : "",
    reviewer_email: "",
    rating: 0,
  });

  const [isSubmited, setSubmited] = useState(false);

  const { review, rating } = formData;

  const ratingCaptured = (e) => {
    setFormData({ ...formData, rating: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRating(formData, order_id);
    setSubmited(true);
  };

  return isSubmited ? (
    <div className="rat-success">
      <img
        src={
          "https://order.yammyfoods.in/wp-content/uploads/2021/05/success-green-check-mark.png"
        }
        alt="yammy-foods"
      />
      <center>Rating Submitted Successfully</center>
    </div>
  ) : (
    menu && (
      <Fragment>
        <form onSubmit={(e) => handleSubmit(e)} className="rating-wrapper">
          <strong>
            {indx + 1}. {menu.name}
          </strong>
          <br />
          <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={(e) => ratingCaptured(e)}
            numberOfStars={5}
            name="rating"
          />
          <br />
          <textarea
            type="text"
            name="review"
            value={review}
            onChange={(e) =>
              setFormData({ ...formData, review: e.target.value })
            }
          />
          <button className="btn" type="submit">
            Submit Rating
          </button>
        </form>
      </Fragment>
    )
  );
};

RateFood.propTypes = {
  submitRating: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  submitRating,
})(RateFood);
