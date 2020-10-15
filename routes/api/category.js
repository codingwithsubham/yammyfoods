const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const WooCommerce = new WooCommerceRestApi({
  url: 'https://order.yammyfoods.in',
  consumerKey: 'ck_dc8dad5098d39337e95edb17b2f39867e2bf09ab',
  consumerSecret: 'cs_44a85a5cc16d5998b5e0bd24d1b5b6cee4388ec1',
  version: 'wc/v3'
});

// @route   get products latest
router.get('/foodshubs', async (req, res) => {
  let categories;
  if (!categories) {
    WooCommerce.get('products/categories?per_page=100')
      .then(response => {
        categories = response.data;
        res.json(categories);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

// @route   get child Categories by ID
router.get('/restros/:id', async (req, res) => {
  let categories;
  if (!categories) {
    WooCommerce.get(`products?category=${req.params.id}&&per_page=100`)
      .then(response => {
        categories = response.data;
        res.json(categories);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
});

module.exports = router;
