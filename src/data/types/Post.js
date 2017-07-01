// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { connectionArgs, toGlobalId } from 'graphql-relay';
import MetaType from './Meta';
import UserType from './User';
import { nodeInterface, CommentConnection } from './RelaySpecialized';

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'a post',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'post id',
      resolve: ({ id }) => toGlobalId('Post', id),
    },
    url: {
      type: GraphQLString,
      description: 'the semantic(**human friendly**) url',
    },
    author: {
      type: new GraphQLNonNull(UserType),
      description: 'the author of the post',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the post title',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the post content',
    },
    comments: {
      type: CommentConnection,
      args: connectionArgs,
      description: 'the comments of the posts',
    },
    meta: {
      type: new GraphQLNonNull(MetaType),
      description: 'the time when the comment was created and updated',
    },
  }),
  interfaces: () => [nodeInterface],
});

export default PostType;
