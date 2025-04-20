const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  contactNumber: {
    type: String,
    required: true, // Assuming Indian 10-digit phone numbers
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  quantityOfFood: {
    type: String, // Could be in KG or any metric unit
    required: true,
  },

  foodDescription: {
    type: String,
    required: true,
    trim: true,
  },

  expiryDate: {
    type: Date,
    default: Date.now
  },

  foodType: {
    type: String,
    enum: ['veg', 'non-veg'],
    required: true,
  }
});

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;

