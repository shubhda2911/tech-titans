const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true, // 10-digit phone number
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
  },
  textarea: {
    type: String,
    default: ''
  },

  haveVehicle: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;

