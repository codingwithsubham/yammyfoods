const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const getWooInstance = require("../../middleware/getWooInstance");

// @route   get products latest
router.get("/", auth, async (req, res) => {
  let products;
  const WooCommerce = getWooInstance(req.user.location);
  if (!products) {
    WooCommerce.get("products")
      .then((response) => {
        products = response.data;
        res.json(products);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

// @route   get products by ID
router.get("/:id", auth, async (req, res) => {
  let product;
  const WooCommerce = getWooInstance(req.user.location);
  if (!product) {
    WooCommerce.get(`products/${req.params.id}`)
      .then((response) => {
        product = response.data;
        res.json(product);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

// @route products Search
router.post("/search", auth, async (req, res) => {
  const { keyword } = req.body;
  let products;
  const WooCommerce = getWooInstance(req.user.location);
  if (!products) {
    WooCommerce.get(`products?search=${keyword}`)
      .then((response) => {
        products = response.data;
        res.json(products);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

// @route submit rating
router.post("/submit-rating", auth, async (req, res) => {
  const { data, order_id } = req.body;
  const WooCommerce = getWooInstance(req.user.location);
  WooCommerce.post("products/reviews", data)
    .then(() => {
      const order_data = {
        customer_note: "rating-submitted",
      };
      WooCommerce.put(`orders/${order_id}`, order_data)
        .then(() => {
          res.json("success");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
});

module.exports = router;
