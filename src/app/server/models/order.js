const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  amount: Number,
  totalBill: Number,
  foodItem: String,
  user : String,
  status : String,
  description : String,
  request : String
});

module.exports = mongoose.model('orders', orderSchema);