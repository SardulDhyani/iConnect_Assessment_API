const mongoose = require('mongoose');

const iconSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  logoLink: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const iConModel = mongoose.model('iConCompanie', iconSchema);
module.exports = iConModel;
