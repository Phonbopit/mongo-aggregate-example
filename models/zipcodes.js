'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Zipcodes = new Schema({
  _id: {
    type: String,
    unique: true,
    index: true
  },
  city: String,
  loc: {
    type: [Number],
    index: '2d'
  },
  pop: Number,
  state: String
});

module.exports = mongoose.model('Zipcodes', Zipcodes);