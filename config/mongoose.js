'use strict';

const mongoose = require('mongoose');
const mongoUri = require('./index').mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

module.exports = mongoose;