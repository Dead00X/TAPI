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
  Description: String,
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal; // Export Animal model for use in other files
