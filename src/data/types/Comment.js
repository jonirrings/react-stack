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
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface } from './Interface';
import User from './User';
import Post from './Post';

// import Essay from './Essay';

const CommentType = new ObjectType({
  name: 'Comment',
  description: 'Comment on a post and reply to other comment',
  fields: () => ({
    id: globalIdField('Comment'),
    author: {
      type: new NonNull(User),
      description: 'who wrote the comment',
    },
    content: {
      type: new NonNull(StringType),
      description: 'the content of the comment',
    },
    created: {
      type: new NonNull(IntType),
      description: 'the time the comment was wrote',
    },
    commentOn: {
      type: new NonNull(Post),
      description: 'the post it commented on',
    },
    replyTo: {
      type: CommentType,
      description: 'the comment it reply to',
    },
  }),
  interfaces: [nodeInterface],
  // interfaces: [Essay],
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
