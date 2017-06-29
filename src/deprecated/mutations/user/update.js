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
  GraphQLID as IDType,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';
import { UserType } from '../../types';
import { updateUser } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: { type: new NonNull(IDType) },
    name: { type: new NonNull(StringType) },
    avatar: { type: new NonNull(StringType) },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: user => user,
    },
  },
  mutateAndGetPayload: ({ id, name, avatar }) => updateUser({ id, name, avatar }),
});

export default mutation;
