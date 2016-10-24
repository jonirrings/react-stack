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
import { PostType } from '../../types';
import { updatePost } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: { type: new NonNull(IDType) },
    name: { type: new NonNull(StringType) },
    avatar: { type: new NonNull(StringType) },
  },
  outputFields: {
    user: {
      type: PostType,
      resolve: post => post,
    },
  },
  mutateAndGetPayload: ({ id, name, avatar }) => updatePost({ id, name, avatar }),
});

export default mutation;
