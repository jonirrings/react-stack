/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';
import {
  connectionDefinitions, connectionArgs,
  connectionFromArray, globalIdField,
} from 'graphql-relay';
import User from './User';
import { nodeInterface } from './Interface';
// import Essay from './Essay';
import { CommentConnection } from './Comment';
import { getCommentsByPostId } from '../models';

const PostType = new ObjectType({
  name: 'Post',
  description: 'A Post is an article with comments',
  fields: () => ({
    id: globalIdField('Post'),
    author: {
      type: new NonNull(User),
      description: 'who wrote the post',
    },
    title: {
      type: new NonNull(StringType),
      description: 'the title of post',
    },
    content: {
      type: new NonNull(StringType),
      description: 'the content of post',
    },
    comments: {
      type: CommentConnection,
      args: connectionArgs,
      resolve: (post, args, context, info) =>
          connectionFromArray(getCommentsByPostId(post.id), args),
      // TODO modify to meet mongoose promise
      description: 'the comments on the posts',
    },
    visit: {
      type: new NonNull(IntType),
      description: 'the times the post been visited',
    },
    created: {
      type: new NonNull(IntType),
      description: 'the time post was wrote',
    },
    updated: {
      type: new NonNull(IntType),
      description: 'the time post was modified',
    },
  }),
  interfaces: [nodeInterface],
  // interfaces: [Essay],
});
const {
  connectionType: PostConnection,
  edgeType: PostEdge,
} = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
export { PostConnection, PostEdge };
export default PostType;
