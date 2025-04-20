const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true, // Example: 10-digit phone number
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
  },
  textarea: {
    type: String,
    default: '' // Optional note or message
  },
  foodType: {
    type: String,
    enum: ['veg', 'non-veg'],
    required: true
  },
  foodRequirementType: {
    type: String,
    enum: ['cooked', 'uncooked' , 'Packaged'],
    // You can add enum here too, if needed: e.g., ['cooked', 'raw', 'dry']
  }
});

const receiver = mongoose.model('receiver', receiverSchema);
module.exports = receiver;

