const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const getWooInstance = require('../../middleware/getWooInstance');

// @route   get products latest
router.get('/', auth, async (req, res) => {
  let products;
  const WooCommerce = getWooInstance(req.user.location);
  if (!products) {
    WooCommerce.get('products')
      .then(response => {
        products = response.data;
        res.json(products);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

// @route   get products by ID
router.get('/:id', auth, async (req, res) => {
  let product;
  const WooCommerce = getWooInstance(req.user.location);
  if (!product) {
    WooCommerce.get(`products/${req.params.id}`)
      .then(response => {
        product = response.data;
        res.json(product);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

// @route products Search
router.post('/search', auth, async (req, res) => {
  const { keyword } = req.body;
  let products;
  const WooCommerce = getWooInstance(req.user.location);
  if (!products) {
    WooCommerce.get(`products?search=${keyword}`)
      .then(response => {
        products = response.data;
        res.json(products);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

module.exports = router;
