const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart');
//const auth = require('../../middleware/auth');

// @route   get cart items
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.params.id });
    res.json(cart[0].cartItems);
  } catch (err) {
    res.status(500).send(SERVER_ERROR);
  }
});

// @route   get cart items
router.put('/add', async (req, res) => {
  try {
    const { user, id, name, img, price } = req.body;

    const cart = await Cart.find({ user });

    if (cart.length > 0) {
      const cartItems = {
        id: id,
        name: name,
        img: img,
        price: price,
        quantity: 1
      };

      let data = await Cart.findOneAndUpdate(
        { user },
        { $push: { cartItems } },
        { new: true }
      );
      res.json(data.cartItems);
    } else {
      const item = new Cart({
        user: user,
        cartItems: [
          {
            id: id,
            name: name,
            img: img,
            price: price,
            quantity: 1
          }
        ]
      });
      await item.save();

      res.json(item.cartItems);
    }
  } catch (err) {
    console.log(err);

    res.status(500).send('Server Error');
  }
});

router.put('/remove', async (req, res) => {
  try {
    const { user, id } = req.body;
    const cart = await Cart.find({ user });
    if (cart.length > 0) {
      const removeIndex = cart[0].cartItems.map(item => item.id).indexOf(id);
      cart[0].cartItems.splice(removeIndex, 1);
      await cart[0].save();
      res.json(cart[0].cartItems);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
