const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const urlGetter = require('../../middleware/urlGetter');
const getWooInstance = require('../../middleware/getWooInstance');

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
  const WooCommerce = getWooInstance(req.user.location);

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

// @route PUT api/auth
// @desc Update User
// @access Private
router.put('/update-user', auth, async (req, res) => {
  let user;
  const WooCommerce = getWooInstance(req.user.location);

  WooCommerce.put(`customers/${req.user.id}`, req.body)
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
    const { location, mobile } = req.body;
    const uri = urlGetter(location);

    let responce = await axios.post(
      `https://${uri}/wp-json/digits/v1/send_otp/?countrycode=%2B91&mobileNo=${mobile}&type=login`
    );

    //If number does not exixts
    if (responce.data.code === -11 || responce.data.code === -99) {
      responce = await axios.post(
        `https://${uri}/wp-json/digits/v1/send_otp/?countrycode=%2B91&mobileNo=${mobile}&type=register`
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
    console.log(err);
  }
});

// @route   verify otp
router.post('/verifyotp', async (req, res) => {
  try {
    const { location, mobile, type, otp } = req.body;
    const uri = urlGetter(location);

    let responce = await axios.post(
      `https://${uri}/wp-json/digits/v1/verify_otp/?countrycode=%2B91&mobileNo=${mobile}&type=${type}&otp=${otp}`
    );

    //if verified
    if (responce.data.code === 1) {
      let loginData = await axios.post(
        `https://${uri}/wp-json/digits/v1/one_click/?mobileNo=${mobile}&countrycode=%2B91&otp=${otp}`
      );

      if (loginData.data.success) {
        let data = loginData.data.data;

        const payload = {
          user: {
            id: data.user_id,
            location: location
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

// @route GET api/auth
// @desc Get Delivery Boy By Id
// @access Private
router.get('/get-delivery-boy/:id', auth, async (req, res) => {
  //not required if we spent money
});

module.exports = router;
