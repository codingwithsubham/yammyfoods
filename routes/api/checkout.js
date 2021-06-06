const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const getWooInstance = require("../../middleware/getWooInstance");

// @route   to do checkout
router.post("/", auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.post("orders", req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

// @route   to do get shipping details
router.post("/get-shipping", auth, async (req, res) => {
  const { pin, ship_class } = req.body;
  const WooCommerce = getWooInstance(req.user.location);

  let zones = [];
  let zone;
  let price = 0;

  try {
    let response = await WooCommerce.get("shipping/zones");
    zones = response.data;
    if (zones.length > 0) {
      zone = zones.filter((x) => x.name === `${pin}`)[0];
      if (zone) {
        if (ship_class.length > 0) {
          for (let i = 0; i < ship_class.length; i++) {
            if (ship_class[i] !== null) {
              let respo = await WooCommerce.get(
                `shipping/zones/${zone.id}/methods`
              );
              let data = respo.data[0];
              const targetMember = `class_cost_${ship_class[i]}`;
              let settings = data.settings;
              let cost = settings[targetMember];
              price = price + parseFloat(cost.value);
            }
          }
        }
      }
    }
    res.json({ totalCost: price });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
