const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Razorpay = require('razorpay');
const shortid = require('shortid');

const instance = new Razorpay({
  key_id: 'rzp_test_GPnkCc1uMzQQSQ',
  key_secret: 'QMH4FcpksJSC1hoihCA42sjt',
});

// @route   to get an order details
router.post('/', auth, async (req, res) => {
  const { price } = req.body;

  try {
    const data = await instance.orders.create({
      amount: (parseFloat(price) * 100).toString(),
      currency: 'INR',
      receipt: shortid.generate(),
    });
    return res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

// @route   to get an order details
router.post('/verification', async (req, res) => {
  const secret_key = 'yammyFoods@1209';
  const crypto = require('crypto');
  const shasum = crypto.createHmac('sha256', secret_key);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');
  if (digest === req.headers['x-razorpay-signature']) {
    console.log('request is legit');
    // process it
  } else {
    // pass it
  }

  res.json({ status: 'ok' });
});

module.exports = router;
