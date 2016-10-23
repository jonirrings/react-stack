/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mongoose, { Schema } from 'mongoose';

const CookieSchema = new Schema({
  name: String, // User ID
  value: String, // CookieID
  maxAge: {
    type: Number,
    required: true,
    default: 30 * 24 * 3600,
  },
  secure: Boolean,
  path: String,
  domain: String,
  comment: String,
  created: {
    type: Date,
    required: true,
    default: Date.now,
    expires: '30d',
  },
});
const CookieModel = mongoose.model('Cookie', CookieSchema);
export default CookieModel;
