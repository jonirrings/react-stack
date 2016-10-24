/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { User } from '../data/models';

export function findOrCreate({ github, name, avatar }) {
  const user = new User({ github, name, avatar });
  return user;
}
export function remove({ id }, cb) {
  return cb({ id });
}
//TODO put CURD ops in the biz dir
