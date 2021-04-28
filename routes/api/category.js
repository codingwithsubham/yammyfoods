const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const getWooInstance = require('../../middleware/getWooInstance');

// @route   get parent categories
router.get('/foodshubs', auth, async (req, res) => {
  let categories;
  const WooCommerce = getWooInstance(req.user.location);
  if (!categories) {
    WooCommerce.get('products/categories?parent=0&per_page=100')
      .then(response => {
        categories = response.data;
        res.json(categories.filter(x => x.id !== 15));
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

// @route   get child Categories by ID
router.get('/foodshub/restros/:id', auth, async (req, res) => {
  let categories;
  const WooCommerce = getWooInstance(req.user.location);
  if (!categories) {
    WooCommerce.get(`products/categories?parent=${req.params.id}&per_page=100`)
      .then(response => {
        categories = response.data;
        res.json(categories);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

// @route   get products by Categories by ID
router.get('/products/restros/:id', auth, async (req, res) => {
  let products;
  const WooCommerce = getWooInstance(req.user.location);
  if (!products) {
    WooCommerce.get(`products?category=${req.params.id}&&per_page=100`)
      .then(response => {
        products = response.data;
        res.json(products);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

// @route   get products by Categories by ID
router.get('/restro/:id', auth, async (req, res) => {
  let products;
  const WooCommerce = getWooInstance(req.user.location);
  if (!products) {
    WooCommerce.get(`products/categories/${req.params.id}`)
      .then(response => {
        products = response.data;
        res.json(products);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

// @route restros Search
router.post('/search', auth, async (req, res) => {
  const { keyword } = req.body;
  let category;
  const WooCommerce = getWooInstance(req.user.location);
  if (!category) {
    WooCommerce.get(`products/categories?search=${keyword}`)
      .then(response => {
        category = response.data;
        res.json(category);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

module.exports = router;
