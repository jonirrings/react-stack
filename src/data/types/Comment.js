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
  GraphQLBoolean as BooleanType,
  GraphQLID as IDType,
} from 'graphql';
import DateType from './custom/date';
import { connectionDefinitions } from 'graphql-relay';
import { nodeInterface } from './Interface';
import User from './User';
import Post from './Post';

// import Post from './Post';

const CommentType = new ObjectType({
  name: 'Comment',
  description: 'Comment on a post and reply to other comment',
  fields: () => ({
    id: {
      type: new NonNull(IDType),
      description: ' the id of a comment in DB',
    },
    author: {
      type: new NonNull(User),
      description: 'who wrote the comment',
    },
    content: {
      type: new NonNull(StringType),
      description: 'the content of the comment',
    },
    commentOn: {
      type: new NonNull(Post),
      description: 'the post it commented on',
    },
    replyTo: {
      type: CommentType,
      description: 'the comment it reply to',
    },
    locked: {
      type: new NonNull(BooleanType),
      description: 'a comment will be locked after others replied to',
    },
    created: {
      type: new NonNull(DateType),
      description: 'the time the comment was wrote',
    },
    updated: {
      type: new NonNull(DateType),
      description: 'the time the comment was wrote',
    },
  }),
  interfaces: [nodeInterface],
  // interfaces: [Post],
});
const {
  connectionType: CommentConnection,
  edgeType: CommentEdge,
} = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});
export { CommentConnection, CommentEdge };
export default CommentType;
