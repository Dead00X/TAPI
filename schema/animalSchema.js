const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  Name: { type: String, required: true },
  Breed: { type: String, required: true },
  Age: { type: Number, required: true },
  Gender: { type: String, enum: ['Male', 'Female'], required: true },
  Price: { type: Number, required: true },
  Status: { type: String, enum: ['Available', 'Reserved', 'Sold'], required: true },
  Images: [String],
  Description: String
});

module.exports = mongoose.model('Animal', animalSchema);
