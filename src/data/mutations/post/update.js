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
import { CommentType } from '../../types';
import { updateComment } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'UpdateComment',
  inputFields: {
    commentId: { type: new NonNull(IDType) },
    content: { type: new NonNull(StringType) },
  },
  outputFields: {
    user: {
      type: CommentType,
      resolve: comment => comment,
    },
  },
  mutateAndGetPayload: ({commentId,content}) => updateComment({commentId,content}),
});

export default mutation;
