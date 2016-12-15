/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Schema } from 'mongoose';

const StaticSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  post: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Post',
  },
  long: {
    type: Number,
    required: true,
    default: 0,
  },
}, { capped: 1024 * 1024 * 512 });
const StaticModel = mongoose.model('Static', StaticSchema);
export default StaticModel;
