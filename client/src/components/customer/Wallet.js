import React from "react";
import PropTypes from "prop-types";
import {
  getWalletBalance,
  creditWalletBalance,
  getPassBook,
} from "../../actions/wallet";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadRazorpayToggle } from "../../actions/RazorpayOptions";

const Wallet = ({
  getWalletBalance,
  loadRazorpayToggle,
  wallet: { wallet, loading, transactions },
  checkout_state: { paymentStatus },
  creditWalletBalance,
  getPassBook,
  auth: { user },
}) => {
  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);

  useEffect(() => {
    getPassBook();
  }, [getPassBook]);

  const [topUp, setTopUp] = useState({
    tpupOpned: false,
    amunt: "",
    transOpened: false,
  });
  const { tpupOpned, amunt, transOpened } = topUp;
  const [checkoutProcessed, setCheckoutProcessed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadRazorpayToggle(
      amunt,
      user && user.billing && user.billing.first_name,
      user && user.billing && user.billing.phone
    );
    const overlayStyle = document.getElementById("overlay");
    if (overlayStyle) {
      overlayStyle.style.display = "flex";
    }
  };

  if (!checkoutProcessed && paymentStatus === "Success") {
    setCheckoutProcessed(true);
    const overlayStyle = document.getElementById("overlay");
    if (overlayStyle) {
      overlayStyle.style.display = "none";
    }
    creditWalletBalance(amunt);
    setTopUp({
      tpupOpned: false,
      amunt: "",
      transOpened: false,
    });
  }

  if (paymentStatus === "Closed") {
    const overlayStyle = document.getElementById("overlay");
    if (overlayStyle) {
      overlayStyle.style.display = "none";
    }
  }

  return (
    <Fragment>
      <div className="wlt-cntnr">
        <div id="overlay" className="checkout-overlay">
          <div className="loading-content">
            <img
              src={require("../../static/load.gif")}
              alt="loading yammy foods"
            />
            <div className="process">We're Processing Your Transaction</div>
            <div className="process-sub">DO NOT PRESS BACK OR HOME</div>
          </div>
        </div>
        <div className="wlt-hdr">
          <p>{loading ? "Fetching..." : `${wallet} INR`}</p>
        </div>
        <div className="wlt-opt">
          <div
            className="wlt-itms"
            onClick={() =>
              setTopUp({ ...topUp, tpupOpned: !tpupOpned, transOpened: false })
            }
          >
            Top Up
          </div>
          <div
            className="wlt-itms"
            onClick={() =>
              setTopUp({
                ...topUp,
                transOpened: !transOpened,
                tpupOpned: false,
              })
            }
          >
            Passbook
          </div>
        </div>

        {tpupOpned && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="checkout-inputs">
              <span>Enter The Amount</span>
              <input
                type="number"
                value={amunt}
                onChange={(e) => setTopUp({ ...topUp, amunt: e.target.value })}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="btn">
              Continue
            </button>
          </form>
        )}

        {transOpened && (
          <Fragment>
            <div className="order-details-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions &&
                    transactions.map((itm, indx) => (
                      <tr
                        style={{
                          color: itm.type === "credit" ? "green" : "red",
                        }}
                        key={indx}
                      >
                        <td>{itm.date}</td>
                        <td>{itm.amount}</td>
                        <td>{itm.type}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Wallet.propTypes = {
  getWalletBalance: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired,
  checkout_state: PropTypes.object.isRequired,
  loadRazorpayToggle: PropTypes.func.isRequired,
  creditWalletBalance: PropTypes.func.isRequired,
  getPassBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  checkout_state: state.checkout,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getWalletBalance,
  loadRazorpayToggle,
  creditWalletBalance,
  getPassBook,
})(Wallet);
