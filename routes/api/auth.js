const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
const auth = require('../../middleware/auth');

const WooCommerce = new WooCommerceRestApi({
  url: 'https://order.yammyfoods.in',
  consumerKey: 'ck_dc8dad5098d39337e95edb17b2f39867e2bf09ab',
  consumerSecret: 'cs_44a85a5cc16d5998b5e0bd24d1b5b6cee4388ec1',
  version: 'wc/v3'
});

const {
  SERVER_ERROR,
  JWT_SECRET,
  EXPIRES_IN
} = require('../../common/constant/constants');

// @route GET api/auth
// @desc Get User By Id
// @access Private
router.get('/load-user', auth, async (req, res) => {
  let user;

  WooCommerce.get(`customers/${req.user.id}`)
    .then(response => {
      user = response.data;
      res.json(user);
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json({
        errors: [{ msg: 'Unable to Load User' }]
      });
    });
});

// @route  to send otp
router.post('/sendotp', async (req, res) => {
  try {
    const { contrycode, mobile } = req.body;

    let responce = await axios.post(
      `https://order.yammyfoods.in/wp-json/digits/v1/send_otp/?countrycode=${contrycode}&mobileNo=${mobile}&type=login`
    );

    //If number does not exixts
    if (responce.data.code === -11) {
      responce = await axios.post(
        `https://order.yammyfoods.in/wp-json/digits/v1/send_otp/?countrycode=${contrycode}&mobileNo=${mobile}&type=register`
      );
      if (responce.data.code === '1') {
        return res.json({
          send: true,
          type: 'register'
        });
      } else {
        return res.status(400).json({
          errors: [{ msg: 'Unable to send OTP' }]
        });
      }
    }
    //if number exists
    if (responce.data.code === '1') {
      return res.json({
        send: true,
        type: 'login'
      });
    } else {
      return res.status(400).json({
        errors: [{ msg: 'Unable to send OTP' }]
      });
    }
  } catch (err) {
    res.status(500).send(SERVER_ERROR);
  }
});

// @route   verify otp
router.post('/verifyotp', async (req, res) => {
  try {
    const { contrycode, mobile, type, otp } = req.body;

    let responce = await axios.post(
      `https://order.yammyfoods.in/wp-json/digits/v1/verify_otp/?countrycode=${contrycode}&mobileNo=${mobile}&type=${type}&otp=${otp}`
    );

    //if verified
    if (responce.data.code === 1) {
      let loginData = await axios.post(
        `https://order.yammyfoods.in/wp-json/digits/v1/one_click/?mobileNo=${mobile}&countrycode=${contrycode}&otp=${otp}`
      );

      if (loginData.data.success) {
        let data = loginData.data.data;

        const payload = {
          user: {
            id: data.user_id
          }
        };
        jwt.sign(
          payload,
          JWT_SECRET,
          { expiresIn: EXPIRES_IN },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({ token });
          }
        );
      } else {
        return res.status(400).json({
          errors: [{ msg: 'Unable to Verify OTP' }]
        });
      }
    } else {
      return res.status(400).json({
        errors: [{ msg: 'Unable to Verify OTP' }]
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send(SERVER_ERROR);
  }
});

module.exports = router;
