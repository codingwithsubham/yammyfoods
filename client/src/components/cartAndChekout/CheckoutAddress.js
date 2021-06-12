import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { AREAS, AREAS_HALDIA } from "./checkout_areas";

const CheckoutAddress = ({ addedAddr, user, location }) => {
  const [orderDetails, setOrderDetails] = useState({
    first_name: (user && user.first_name) || "",
    address_1: (user && user.address_1) || "",
    city: "West Bengal",
    state: "West Bengal",
    postcode: (user && user.postcode) || "",
    country: "India",
    phone: (user && user.phone) || "",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    setError("");
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Assigning Areas for Ghatal
    if (location === "Ghatal") {
      let pin = AREAS && AREAS.filter((x) => x.pin == orderDetails.postcode);
      if (pin.length <= 0) {
        setError("Service Undeliverable on the Pincode");
      } else {
        addedAddr(orderDetails);
      }
    }
    //Assigning Areas for Haldia
    if (location === "Haldia") {
      let pin =
        AREAS_HALDIA &&
        AREAS_HALDIA.filter((x) => x.pin == orderDetails.postcode);
      if (pin.length <= 0) {
        setError("Service Undeliverable on the Pincode");
      } else {
        addedAddr(orderDetails);
      }
    }
  };

  const history = useHistory();

  return (
    <Fragment>
      <div className="multi-step-container">
        <div className="header">Address Details</div>
        <form onSubmit={(e) => onSubmit(e)} className="address-box">
          <div className="checkout-inputs">
            <span>Full Name</span>
            <input
              type="text"
              name="first_name"
              value={orderDetails.first_name}
              onChange={(e) => onChange(e)}
              required
              maxLength={30}
              minLength={5}
            />
            <span>Whats App No</span>
            <input
              type="text"
              name="phone"
              value={orderDetails.phone}
              onChange={(e) => onChange(e)}
              required
              maxLength={10}
              minLength={10}
            />
            <span>Addredd Info</span>
            <input
              type="text"
              name="address_1"
              value={orderDetails.address_1}
              onChange={(e) => onChange(e)}
              required
              maxLength={60}
              minLength={5}
            />
            <span>Pincode No</span>
            <input
              type="text"
              name="postcode"
              value={orderDetails.postcode}
              onChange={(e) => onChange(e)}
              required
              maxLength={6}
              minLength={6}
            />
          </div>
          <p className="error">{error}</p>
          <div className="cart-final">
            <button onClick={() => history.goBack()} className="btn prev">
              Prev
            </button>
            <button type="submit" className="btn next">
              Next
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CheckoutAddress;
