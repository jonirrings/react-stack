/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import run from './run';
import clean from './clean';
import copy from './copy';
import updateSchema from './updateSchema';
import bundle from './bundle';

async function build() {
  await run(clean);
  await run(copy);
  await run(updateSchema);
  await run(bundle);
}

export default build;
