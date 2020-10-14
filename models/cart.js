const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  cartItems: [
    {
      id: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Cart = mongoose.model('cart', CartSchema);
