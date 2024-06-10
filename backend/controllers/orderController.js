const Order = require('../models/Order');

exports.createOrder = (req, res) => {
  const newOrder = new Order(req.body);
  newOrder.save()
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.getOrders = (req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
};
