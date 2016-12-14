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
  cursorForObjectInConnection,
} from 'graphql-relay';
import { CommentEdge } from '../../types';
import { getCommentsByPostId, addComment } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'AddComment',
  inputFields: {
    author: { type: new NonNull(IDType) },
    content: { type: new NonNull(StringType) },
    commentOnId: { type: new NonNull(IDType) },
    replyToId: { type: IDType },
  },
  outputFields: {
    commentEdge: {
      type: CommentEdge,
      resolve: comment => ({
        cursor: cursorForObjectInConnection(
          getCommentsByPostId(comment.commentOn.id), comment,
        ),
        node: comment,
      }),
    },
  },
  mutateAndGetPayload:
    ({ author, content, commentOnId, replyToId }) =>
      addComment({ author, content, commentOnId, replyToId }),
});

export default mutation;
