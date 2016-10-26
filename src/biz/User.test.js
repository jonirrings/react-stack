/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'babel-polyfill';
import mongoose from 'mongoose';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Promise from 'bluebird';
import { databaseUrl } from '../config';
// import { create, findById, retrieve } from './User';
import User from '../data/models/User';

mongoose.Promise = Promise;
mongoose.connect(databaseUrl);
describe('CRUD Test Against mongoose', () => {
  describe('Find By id', () => {
    it('should return an object', async () => {
      const user2 = await User.findOne({ _id: '580f51196d484010ac4e9f62' })
          .exec();
      expect(user2.toObject()).to.have.any.keys('github', 'name', 'avatar');
    });
  });
});
