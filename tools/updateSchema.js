/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import { writeFile, makeDir } from './lib/fs';
import schema from '../src/data/schema';

function updateSchema() {
  return new Promise((resolve, reject) => {
// Save JSON of full schema introspection for Babel Relay Plugin to use
    (async () => {
      const result = await (graphql(schema, introspectionQuery));
      if (result.errors) {
        console.error(
          'ERROR introspecting schema: ',
          JSON.stringify(result.errors, null, 2)
        );
        reject(result.errors);
      } else {
        await makeDir('data');
        writeFile(
          'data/schema.json',
          JSON.stringify(result, null, 2)
        );
      }
    })();

// Save user readable type system shorthand of schema
    writeFile(
      'data/schema.graphqls',
      printSchema(schema)
    );
    resolve();
  });
}

export default updateSchema;
