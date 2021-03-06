/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { UserModel } from '../data/models';

export function getUserById(id:string) {
  return UserModel
    .findById(id)
    .exec();
}
export function updateUserById(id) {
  return id;
}
