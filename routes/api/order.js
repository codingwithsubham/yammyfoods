const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const getWooInstance = require("../../middleware/getWooInstance");

// @route   to get an order details
router.get("/:id", auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.get(`orders/${req.params.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

// @route   to get orders for a Customer
router.get("/", auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.get(`orders?customer=${req.user.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

// @route   to get Assigned orders for a driver
router.post("/assigned-for-delivery", auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.get(`orders/drivers/assigned?id=${req.user.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response);
    });
});

// @route   to get Assigned orders for a driver
router.post("/marked-orders-for-delivery", auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.get(`orders/drivers/out-for-delivery?id=${req.user.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response);
    });
});

// @route   to get Assigned orders for a driver
router.post("/completed-for-delivery", auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.get(`orders/drivers/completed?id=${req.user.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response);
    });
});

// @route   to change Order Status
router.post("/change-status/:id", auth, async (req, res) => {
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.put(`orders/${req.params.id}`, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

module.exports = router;
