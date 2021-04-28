const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const getWooInstance = require('../../middleware/getWooInstance');

// @route   to get an order details
router.get('/:id', auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.get(`orders/${req.params.id}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.json(error.response.data);
    });
});

// @route   to get orders for a Customer
router.get('/', auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.get(`orders?customer=${req.user.id}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.json(error.response.data);
    });
});

module.exports = router;
