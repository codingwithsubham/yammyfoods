import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddressDetails from "./CheckoutAddress";
import TimeArea from "./CheckoutTimeArea";
import { getShipping, checkout } from "../../actions/checkout";
import { getWalletBalance, debitWalletBallance } from "../../actions/wallet";
import { Redirect } from "react-router-dom";
import {
  loadRazorpayToggle,
  initRazorpay,
} from "../../actions/RazorpayOptions";

const Checkout = ({
  cart: { cart_items },
  auth: { user },
  getShipping,
  getWalletBalance,
  wallet: { wallet },
  checkout_state: { delivery_charge, checkoutData, loading, paymentStatus },
  checkout,
  loadRazorpayToggle,
  debitWalletBallance,
  initRazorpay,
}) => {
  const [data, setData] = useState({
    address: null,
    locationAndTime: null,
    shipping: 0,
    payment: null,
  });

  const [formFlagdata, setFormFlagdata] = useState({
    addressFlag: true,
    locationAndTimeFlag: false,
    paymentFlag: false,
  });

  const [dataToBeSend, setDataToBeSend] = useState();
  const [checkoutProcessed, setCheckoutProcessed] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const { address, locationAndTime, payment } = data;
  const { addressFlag, locationAndTimeFlag, paymentFlag } = formFlagdata;

  const addedAddr = (propdata) => {
    setData({ ...data, address: propdata });
    setFormFlagdata({
      addressFlag: false,
      locationAndTimeFlag: true,
      paymentFlag: false,
    });
  };

  const timeArea = (propdata, action) => {
    setData({ ...data, locationAndTime: propdata });
    if (action) {
      setFormFlagdata({
        addressFlag: false,
        locationAndTimeFlag: false,
        paymentFlag: true,
      });
    } else {
      setFormFlagdata({
        addressFlag: true,
        locationAndTimeFlag: false,
        paymentFlag: false,
      });
    }
  };

  const prevFromPayment = () => {
    setFormFlagdata({
      addressFlag: false,
      locationAndTimeFlag: true,
      paymentFlag: false,
    });
  };

  let cartData = cart_items;
  const unique = [...new Set(cartData.map((item) => item.id))];
  const shippingClasses = [...new Set(cartData.map((item) => item.ship_class))];

  const cartTotals = () => {
    let total = 0;
    cart_items.map((item) => (total = total + parseFloat(item.price)));
    return total;
  };

  const deliveryTotals = () => {
    const data = {
      pin: address && address.postcode,
      ship_class: shippingClasses,
    };

    getShipping(data);
    if (!loading) {
      return `${
        delivery_charge +
        parseInt(
          locationAndTime &&
            locationAndTime.location &&
            locationAndTime.location.value
        )
      }/-`;
    } else {
      return "...";
    }
  };

  useEffect(() => {
    deliveryTotals();
  }, [deliveryTotals]);

  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);

  const totalPrice = () => {
    if (!loading) {
      return `${
        delivery_charge +
        parseInt(
          locationAndTime &&
            locationAndTime.location &&
            locationAndTime.location.value
        ) +
        cartTotals()
      }/-`;
    } else {
      return "Calculating ...";
    }
  };

  const onRadioChange = (e) => {
    setData({ ...data, payment: e.target.value });
  };

  const finalCall = () => {
    let line_items = [];
    unique.map((uniqueItem) => {
      line_items.push({
        product_id: uniqueItem,
        quantity: cart_items.filter((x) => x.id === uniqueItem).length,
      });
    });

    const finalData = {
      payment_method: payment,
      payment_method_title: payment,
      set_paid: true,
      customer_note: locationAndTime.customerNotes,
      customer_id: user.id,
      billing: {
        first_name: address.first_name,
        last_name: "",
        address_1: address.address_1,
        address_2: `Location: ${locationAndTime.location.label} | Time: ${locationAndTime.time}`,
        city: address.city,
        state: address.state,
        postcode: address.postcode,
        country: address.country,
        phone:
          address && address.phone && address.phone.includes("+91")
            ? address.phone
            : `+91${address.phone}`,
      },
      line_items: line_items,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: `${deliveryTotals()}`,
        },
      ],
    };

    const priceData = totalPrice();

    if (payment === "Razorpay") {
      loadRazorpayToggle(priceData, address.first_name, address.phone);
      setDataToBeSend(finalData);
    }

    if (payment === "Wallet") {
      if (parseFloat(priceData) > parseFloat(wallet)) {
        let reAmt = parseFloat(priceData) - parseFloat(wallet);
        loadRazorpayToggle(reAmt, address.first_name, address.phone);
        setDataToBeSend(finalData);
      } else {
        debitWalletBallance(priceData);
        checkout(finalData);
        setCheckoutSuccess(true);
      }
    }

    if (payment === "Cash on delivery") {
      checkout(finalData);
      setCheckoutSuccess(true);
    }

    const overlayStyle = document.getElementById("overlay");
    if (overlayStyle) {
      overlayStyle.style.display = "flex";
    }
  };

  if (!checkoutProcessed && paymentStatus === "Success") {
    setCheckoutProcessed(true);
    if (payment === "Razorpay") {
      checkout(dataToBeSend);
      setCheckoutSuccess(true);
    }
    if (payment === "Wallet") {
      debitWalletBallance(wallet);
      checkout(dataToBeSend);
      setCheckoutSuccess(true);
    }
  }

  if (paymentStatus === "Closed") {
    initRazorpay();
    const overlayStyle = document.getElementById("overlay");
    if (overlayStyle) {
      overlayStyle.style.display = "none";
    }
  }

  if (checkoutSuccess) {
    return <Redirect to={`/checkout/success/`} />;
  }

  return (
    <div className="checkout">
      <div id="overlay" className="checkout-overlay">
        <div className="loading-content">
          <img
            src={require("../../static/load.gif")}
            alt="loading yammy foods"
          />
          <div className="process">We're Processing Your Order</div>
          <div className="process-sub">DO NOT PRESS BACK OR HOME</div>
        </div>
      </div>
      {addressFlag && (
        <AddressDetails
          user={address ? address : user && user.billing}
          addedAddr={addedAddr}
        />
      )}
      {locationAndTimeFlag && (
        <TimeArea timeArea={timeArea} pin={address.postcode} />
      )}
      {paymentFlag && (
        <Fragment>
          <div className="checkout-header">Final Details</div>
          <div className="order-details-table">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {unique.map((uniqueItem, idx) => (
                  <tr key={idx}>
                    <td>
                      {cart_items.filter((x) => x.id === uniqueItem)[0].name}
                    </td>
                    <td>
                      {cart_items.filter((x) => x.id === uniqueItem).length}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {cart_items.filter((x) => x.id === uniqueItem)[0].price}/-
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    Cart Sub Totals:
                    <br />
                    Delivery Charge:
                    <br />
                    <br />
                    ..
                  </td>
                  <td colSpan="2" style={{ textAlign: "right" }}>
                    {cartTotals()}/- <br />
                    {delivery_charge +
                      parseInt(
                        locationAndTime &&
                          locationAndTime.location &&
                          locationAndTime.location.value
                      )}{" "}
                    /-
                    <hr />
                    Total - {totalPrice()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="time-block">
            <label className="radio-container">
              Pay By Wallet ({wallet})
              <input
                type="radio"
                name="radio"
                value="Wallet"
                onChange={(e) => onRadioChange(e)}
              />
              <span className="checkmark"></span>
            </label>
            <label className="radio-container">
              Cash On Delivery
              <input
                type="radio"
                name="radio"
                value="Cash on delivery"
                onChange={(e) => onRadioChange(e)}
              />
              <span className="checkmark"></span>
            </label>
            <label className="radio-container">
              Pay Online
              <input
                type="radio"
                name="radio"
                value="Razorpay"
                onChange={(e) => onRadioChange(e)}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="cart-final">
            <button className="btn prev" onClick={() => prevFromPayment()}>
              Back
            </button>
            {!loading ? (
              <button
                className="btn next"
                onClick={(e) => (!loading ? finalCall() : e.preventDefault())}
              >
                Place Order
              </button>
            ) : (
              <button className="btn next" style={{ opacity: 0.4 }}>
                Calculating
              </button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Checkout.propTypes = {
  initRazorpay: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getShipping: PropTypes.func.isRequired,
  checkout_state: PropTypes.object.isRequired,
  checkout: PropTypes.func.isRequired,
  getWalletBalance: PropTypes.func.isRequired,
  wallet: PropTypes.object,
  loadRazorpayToggle: PropTypes.func,
  debitWalletBallance: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  checkout_state: state.checkout,
  wallet: state.wallet,
});

export default connect(mapStateToProps, {
  getShipping,
  checkout,
  getWalletBalance,
  loadRazorpayToggle,
  debitWalletBallance,
  initRazorpay,
})(Checkout);
