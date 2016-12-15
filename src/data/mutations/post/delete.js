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
import { removePost } from '../../models';
import { notifyChange } from '../notifiers';

const mutation = mutationWithClientMutationId({
  name: 'DeletePost',
  inputFields: {
    id: { type: new NonNull(IDType) },
  },
  outputFields: {
    deletedPostId: {
      type: IDType,
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: ({ id }) => {
    removePost({ id });
    notifyChange('delete_post', { id });
  },
});

export default mutation;
