// @flow
import Promise from 'bluebird';
import mongoose from 'mongoose';

import { databaseUrl } from '../../core/config';

mongoose.Promise = Promise;

const options = {
};

function sync() {
  return mongoose.connect(databaseUrl, options);
}

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.info(`Mongoose default connection open to ${databaseUrl}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.info(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export default { sync };
