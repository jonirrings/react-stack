/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'babel-polyfill';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { findUserById } from './User';
import { getPosts, writePost } from './Post';

describe('CRUD Test Against mongoose', () => {
  describe('Find Author By id', () => {
    it('should return an object', async() => {
      const user2 = await findUserById('580f3277b5bec30230bfa179');
      expect(user2).to.have.any.keys('github', 'name', 'avatar');
    });
  });
  describe('Get Posts', () => {
    it('should return an array', async() => {
      const posts = await getPosts();
      console.log(posts[0]);
      expect(posts[0]).to.have.property('id');
    });
  });
});
