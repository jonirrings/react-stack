/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  qq: String,
  weibo: String,
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  avator: String,
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
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
