const mongoose = require('mongoose');

const SentenceSchema = new mongoose.Schema({
  _id: String,
  sentenceContent: String,
  sentencePoetry: {
    type: String,
    ref: 'Poetry'
  },
  sentencePoetryName: String,
  sentenceAuthorName: String
});

mongoose.model('Sentence', SentenceSchema);
