/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanDir } from './lib/fs';

function clean() {
  return Promise.all([
    cleanDir('build/*', {
      nosort: true,
      dot: true,
      ignore: ['build/.git', 'build/public'],
    }),
    cleanDir('build/public/*', {
      nosort: true,
      dot: true,
      ignore: ['build/public/.git'],
    }),
  ]);
}
export default clean;
