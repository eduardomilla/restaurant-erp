const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
