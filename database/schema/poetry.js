const mongoose = require('mongoose');

const PoetrySchema = new mongoose.Schema({
  _id: String,
  title: String,
  content: String,
  author: {
    type: String,
    ref: 'Poet'
  },
  authorName: String
});

mongoose.model('Poetry', PoetrySchema);
