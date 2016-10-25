/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { User } from '../data/models';

export function create({ github, name, avatar }) {
  const user = new User({ github, name, avatar });
  return user.save();
}
export function retrieve({ github }) {
  return User.findOne({ github }).exec();
}

export function findOrCreate({ github, name, avatar }) {
  return retrieve({ github })
    .then((e) => {
      if (e) {
        return e;
      }
      return create({ github, name, avatar });
    })
    .then(e => e.toObject());
}
