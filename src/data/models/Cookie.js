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
  name: {
    type: String,
    default: 'login',
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  // CookieID most is a base64 hash digest of an uuid
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
    expires: '7d',
  },
}, { capped: 1024 * 1024 * 512 });
const CookieModel = mongoose.model('Cookie', CookieSchema);
export default CookieModel;
