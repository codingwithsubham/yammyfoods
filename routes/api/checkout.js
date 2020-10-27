const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const WooCommerce = new WooCommerceRestApi({
  url: 'https://order.yammyfoods.in',
  consumerKey: 'ck_dc8dad5098d39337e95edb17b2f39867e2bf09ab',
  consumerSecret: 'cs_44a85a5cc16d5998b5e0bd24d1b5b6cee4388ec1',
  version: 'wc/v3'
});

// @route   to do checkout
router.post('/', auth, async (req, res) => {
  WooCommerce.post('orders', req.body)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.json(error.response.data);
    });
});

// @route   to do get shipping details
router.post('/get-shipping', auth, async (req, res) => {
  const { pin, ship_class } = req.body;

  let zones = [];
  let zone;
  let price = 0;

  try {
    let response = await WooCommerce.get('shipping/zones');
    zones = response.data;

    if (zones.length > 0) {
      zone = zones.filter(x => x.name === `${pin}`)[0];

      if (zone) {
        if (ship_class.length > 0) {
          for (let i = 0; i < ship_class.length; i++) {
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
    res.json({ totalCost: price });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
