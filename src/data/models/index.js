// @flow
import Promise from 'bluebird';
import mongoose from 'mongoose';

import { databaseUrl } from '../../core/config';

mongoose.Promise = Promise;

const options = {
  useMongoClient: true,
};

function sync() {
  return mongoose.connect(databaseUrl, options);
}

export default { sync };
