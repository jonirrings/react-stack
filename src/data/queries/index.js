/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GraphQLObjectType as ObjectType, GraphQLNonNull as NonNull } from 'graphql';
import ViewerType from '../types/Viewer';
import { nodeField } from '../types';

const queryType = new ObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: new NonNull(ViewerType),
      description: 'the viewer\'s information',
      resolve: (root, args, { user }) => {
        if (user) {
          return { id: user.id, name: user.name };
        }
        return { id: null, name: null };
      },
    },
    node: nodeField,
  },
});

export default queryType;
