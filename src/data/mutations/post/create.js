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
import { PostEdge } from '../../types';
import { getPosts, addPost } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'AddPost',
  inputFields: {
    author: { type: new NonNull(IDType) },
    title: { type: new NonNull(StringType) },
    content: { type: new NonNull(StringType) },
  },
  outputFields: {
    postEdge: {
      type: PostEdge,
      resolve: post => ({
        cursor: cursorForObjectInConnection(getPosts(), post),
        node: post,
      }),
    },
  },
  mutateAndGetPayload: ({ author, title, content }) => addPost({ author, title, content }),
});

export default mutation;
