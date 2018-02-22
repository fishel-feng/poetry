import mongoose from 'mongoose'
import config from '../config'

require('./schema/poet');
require('./schema/poetry');
require('./schema/sentence');

// 链接mongodb
export const database = () => {
  mongoose.set('debug', true);

  mongoose.connect(config.db);

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db);
  });
  mongoose.connection.on('error', err => {
    console.error(err);
  });

  // mongoose.connection.on('open', async () => {
  //   console.log('Connected to MongoDB ', config.db)
  // });
};