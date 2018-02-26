const mongoose = require('mongoose');

const SingleSchema = new mongoose.Schema({
  poetName: String,
  poetryName: String,
  poetry: {
    type: String,
    ref: 'Poetry'
  },
  content: String
});

mongoose.model('Single', SingleSchema);
