/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
    expires: '1h',
  },
});
const ChatModel = mongoose.model('Chat', ChatSchema);
export default ChatModel;
