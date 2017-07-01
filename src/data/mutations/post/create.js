// @flow
import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';
import { PostType } from '../../types';
import { createPost } from '../../models/Post';

const mutation = mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: { type: new NonNull(StringType) },
    content: { type: new NonNull(StringType) },
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: post => post,
    },
  },
  mutateAndGetPayload: ({ title, content }, { user }) =>
    createPost({ author: user.id, title, content }),
});

export default mutation;
