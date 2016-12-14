/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import extendId from './util/extendId';
import { Post } from '../data/models';

export async function getPosts() {
  const posts = await Post.find().exec();
  if (posts.length > 0) {
    return posts.map(extendId);
  }
  return posts;
}
export async function getPostsByAuthorId(id) {
  const posts = await Post.find({ author: id }).exec();
  if (posts.length > 0) {
    return posts.map(extendId);
  }
  return posts;
}
export async function getPostById(id) {
  const post = await Post.findById(id).exec();
  if (post) {
    return extendId(post);
  }
  return post;
}
export async function writePost({ authorId, title, content }) {
  const post = new Post({ author: authorId, title, content }).save();
  return await post.then(extendId);
}
