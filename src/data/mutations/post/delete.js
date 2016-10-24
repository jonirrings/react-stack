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
  GraphQLID as IDType,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';
import { removeComment } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'DeleteComment',
  inputFields: {
    id: { type: new NonNull(IDType) },
  },
  outputFields: {
    user: {
      type: IDType,
      resolve: ({id}) => id,
    },
  },
  mutateAndGetPayload: ({ id }) => removeComment({ id }),
});

export default mutation;
