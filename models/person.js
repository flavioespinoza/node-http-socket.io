'use strict';

const mongoose = require('../config/mongoose');

const requiredString = { type: String, required: true};

const PersonSchema = new mongoose.Schema({
  firstName: requiredString,
  lastName: requiredString,
  age: { type: Number, required: true },
  address: requiredString
});

module.exports = mongoose.model('Person', PersonSchema);