/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Schema } from 'mongoose';

const EssaySchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    set: v => v.trim().replace(/\s/g, '_'),
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.ObjectId, ref: 'Essay' }],
  commentOn: { type: Schema.ObjectId, ref: 'Essay' },
  replyTo: { type: Schema.ObjectId, ref: 'Essay' },
  private: {
    type: Boolean,
    required: true,
    default: false,
  },
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
const EssayModel = mongoose.model('Essay', EssaySchema);
export default EssayModel;
