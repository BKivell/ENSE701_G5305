// models/DummyModel.js
const mongoose = require('mongoose');

const DummySchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  claim: String,
  evidence: String,
});

const DummyModel = mongoose.model('DummyModel', DummySchema);

module.exports = DummyModel;
