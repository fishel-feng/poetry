import mongoose from 'mongoose';
import config from '../config';

require('./schema/poet');
require('./schema/poetry');
require('./schema/sentence');

const poet = require('../data/poet.json');
const poetry = require('../data/poetry.json');
const sentence = require('../data/sentence.json');

export const init = () => {

  mongoose.set('debug', true);

  mongoose.connect(config.db);

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db);
  });

  mongoose.connection.on('error', err => {
    console.error(err);
  });

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB', config.db);

    const Poet = mongoose.model('Poet');
    const Poetry = mongoose.model('Poetry');
    const Sentence = mongoose.model('Sentence');

    Poet.insertMany(poet);
    Poetry.insertMany(poetry);
    Sentence.insertMany(sentence);

    console.log('success');
  });
};

init();
