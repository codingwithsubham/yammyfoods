const express = require("express");
const router = express.Router();
const Cart = require("../../models/cart");
const auth = require("../../middleware/auth");

// @route   get cart items
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json(cart ? cart.cartItems : []);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
});

// @route   get cart items
router.put("/add", auth, async (req, res) => {
  try {
    const { id, name, img, price, ship_class } = req.body;
    const user = req.user.id;

    const cart = await Cart.find({ user });
    if (cart.length > 0) {
      const cartItems = {
        id: id,
        name: name,
        img: img,
        price: price,
        quantity: 1,
        ship_class: ship_class,
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
            quantity: 1,
            ship_class: ship_class,
          },
        ],
      });
      await item.save();

      res.json(item.cartItems);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.put("/remove", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user.id;
    const cart = await Cart.find({ user });
    if (cart.length > 0) {
      const removeIndex = cart[0].cartItems.map((item) => item.id).indexOf(id);
      cart[0].cartItems.splice(removeIndex, 1);
      await cart[0].save();
      res.json(cart[0].cartItems);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/reset-cart", auth, async (req, res) => {
  try {
    const user = req.user.id;
    await Cart.deleteOne({ user });
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
