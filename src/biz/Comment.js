/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import extendId from './util/extendId';
import { Comment } from '../data/models';

export async function getCommentsByAuthorId(id) {
  const comments = await Comment.find({ author: id }).exec();
  if (comments.length > 0) {
    return comments.map(extendId);
  }
  return comments;
}
export async function getCommentById(id) {
  const comment = await Comment.findById(id).exec();
  if (comment) {
    return extendId(comment);
  }
  return comment;
}
export async function getCommentsByPostId(id) {
  const comments = await Comment.find({ commentOn: id }).exec();
  if (comments.length > 0) {
    return comments.map(extendId);
  }
  return comments;
}
