const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  status : String
});

module.exports = mongoose.model('food', foodSchema);