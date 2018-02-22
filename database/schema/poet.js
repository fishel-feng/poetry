const mongoose = require('mongoose');

const PoetSchema = new mongoose.Schema({
  _id: String,
  poetName: String,
  imageId: String,
  desc: String,
  poetryCount: Number
});

mongoose.model('Poet', PoetSchema);
