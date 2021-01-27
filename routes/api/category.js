const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const WooCommerce = new WooCommerceRestApi({
  url: 'https://order.yammyfoods.in',
  consumerKey: 'ck_dc8dad5098d39337e95edb17b2f39867e2bf09ab',
  consumerSecret: 'cs_44a85a5cc16d5998b5e0bd24d1b5b6cee4388ec1',
  version: 'wc/v3',
});

// @route   get parent categories
router.get('/foodshubs', async (req, res) => {
  let categories;
  if (!categories) {
    WooCommerce.get('products/categories?parent=0&per_page=100')
      .then((response) => {
        categories = response.data;
        res.json(categories.filter((x) => x.id !== 15));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

// @route   get child Categories by ID
router.get('/foodshub/restros/:id', async (req, res) => {
  let categories;
  if (!categories) {
    WooCommerce.get(`products/categories?parent=${req.params.id}&per_page=100`)
      .then((response) => {
        categories = response.data;
        res.json(categories);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

// @route   get products by Categories by ID
router.get('/products/restros/:id', async (req, res) => {
  let products;
  if (!products) {
    WooCommerce.get(`products?category=${req.params.id}&&per_page=100`)
      .then((response) => {
        products = response.data;
        res.json(products);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

// @route   get products by Categories by ID
router.get('/restro/:id', async (req, res) => {
  let products;
  if (!products) {
    WooCommerce.get(`products/categories/${req.params.id}`)
      .then((response) => {
        products = response.data;
        res.json(products);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

// @route restros Search
router.post('/search', async (req, res) => {
  const { keyword } = req.body;
  let category;
  if (!category) {
    WooCommerce.get(`products/categories?search=${keyword}`)
      .then((response) => {
        category = response.data;
        res.json(category);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
});

module.exports = router;
