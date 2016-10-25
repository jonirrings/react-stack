/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Promise from 'bluebird';

export function saveInPromise(model) {
  const p = new Promise();
  model.save((err, result) => {
    p.then(err, result);
  });
}
