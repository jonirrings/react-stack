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
import { getAdmin } from '../../models/User';

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
  async mutateAndGetPayload({ title, content }) {
    /**
     * todo
     * 1. get user from ctx
     * 2. get user db id
     * 3. check user privilege
     * 4a. if true, create post
     * 4b, if false, return graphql error indicates a privilege error
     */
    return getAdmin().then(
      ({ id }) => createPost({ author: id, title, content }),
    );
  },
});

export default mutation;
