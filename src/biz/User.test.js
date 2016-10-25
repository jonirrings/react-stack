/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose from 'mongoose';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Promise from 'bluebird';
import { databaseUrl } from '../config';
import { create,findOrCreate } from './User';

mongoose.Promise = Promise;
mongoose.connect(databaseUrl);
describe('CRUD Test Against mongoose', () => {
  describe('Create', () => {
    it('should return an object', async() => {
      const user = await findOrCreate({ github: 'jr@github', name: 'jonirrings', avatar: 'avatar' })
        .then(user => user.toObject());
      console.log(user);
      expect(user).to.have.any.keys('github', 'name', 'avatar');
    });
  });
});
