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
import { findUserById, findOne } from './User';
import { getPosts, writePost } from './Post';

describe('CRUD Test Against mongoose', () => {
  describe('Write Glance', () => {
    it('should return the post', async () => {
      const user = await findOne();
      const post = writePost({ authorId: user.id, title: 'Test Title', content: 'Test Content' });
      expect(post).to.have.property('id');
    });
  });
  describe('Get Posts', () => {
    it('should return an array', async () => {
      const posts = await getPosts();
      expect(posts[0]).to.have.property('id');
    });
  });
});
