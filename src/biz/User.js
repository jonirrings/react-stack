/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { User } from '../data/models';
import extendId from './util/extendId';
export function create({ github, name, avatar }) {
  const user = new User({ github, name, avatar }).save();
  if (user)
    { return extendId(user); }
  return user;
}
export function retrieve({ github }) {
  return User.findOne({ github }).exec();
}
export async function findUserById(id) {
  const user = await User.findById(id).exec();
  if (user) {
    return extendId(user);
  }
  return user;
}
export function findOrCreate({ github, name, avatar }) {
  return retrieve({ github })
    .then((e) => {
      if (e) {
        return e;
      }
      return create({ github, name, avatar });
    })
    .then(extendId);
}
