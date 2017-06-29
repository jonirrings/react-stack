/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
  visit: {
    type: Number,
    required: true,
    default: 0,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
PostSchema.post('save', post => post
  .populate('author')
  .execPopulate()
  .then((populatedPost) => {
    const author = populatedPost.author;
    author.posts.push(populatedPost.id);
    author.update({ $set: { posts: author.posts } }).exec();
  }));
const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;
