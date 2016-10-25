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
function retrieve({ github }, cb) {
  return User.findOne({ github }, cb);
}

export async function findOrCreate({ github, name, avatar }) {
  return await retrieve({ github },
    async (err, user) => {
      if (err)
        { throw err; }
      if (user) {
        return user.toObject();
      } else {
        return create({ github, name, avatar }).then(user => user.toObject());
      }
    });
}
