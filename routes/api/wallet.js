const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const axios = require('axios');
const username = 'admin';
const password = 'subham123';
const BASE_URL = 'https://order.yammyfoods.in/wp-json/wp/v2';

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

// @route   to get wallet value
router.get('/', auth, async (req, res) => {
  axios
    .get(`${BASE_URL}/current_balance/${req.user.id}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
});

// @route   to debit wallet value
router.post('/debit', auth, async (req, res) => {
  let { debitamt } = req.body;

  axios
    .post(
      `${BASE_URL}/wallet/${req.user.id}`,
      {
        type: 'debit',
        amount: parseFloat(debitamt),
        details: 'New Order At Yammy Foods',
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    )
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
});

// @route   to Credit wallet value
router.post('/credit', auth, async (req, res) => {
  let { creditamnt } = req.body;

  axios
    .post(
      `${BASE_URL}/wallet/${req.user.id}`,
      {
        type: 'credit',
        amount: parseFloat(creditamnt),
        details: 'New Order At Yammy Foods',
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    )
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
});

// @route   to get wallet trasactions
router.get('/passbook', auth, async (req, res) => {
  axios
    .get(`${BASE_URL}/wallet/${req.user.id}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
});

module.exports = router;
