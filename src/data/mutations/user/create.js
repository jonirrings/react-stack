/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
} from 'graphql-relay';
import { UserEdge } from '../../types/User';
import { getUsers, addUser } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    name: { type: new NonNull(StringType) },
    avatar: { type: new NonNull(StringType) },
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: user => ({
        cursor: cursorForObjectInConnection(getUsers(), user),
        node: user,
      }),
    },
  },
  mutateAndGetPayload: ({ name, avatar }) => addUser({ name, avatar }),
});

export default mutation;
