/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import extend from 'extend';
import { UserModel } from '../data/models';
import { UserClass } from '../data/types';

export function getUserById(id) {
  return UserModel
    .findById(id)
    .exec()
    .then(user => extend(new UserClass(), user.toObject()));
}
