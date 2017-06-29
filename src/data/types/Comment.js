/**
 * Created by jonirrings on 17/4/21.
 */

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import MetaType from './Meta';
import PostType from './Post';
import UserType from './User';
import { nodeInterface } from './RelaySpecialized';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'a comment',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'comment id',
    },
    author: {
      type: new GraphQLNonNull(UserType),
      description: 'the author of the comment',
    },
    commentOn: {
      type: new GraphQLNonNull(PostType),
      description: 'the post commented on',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the comment main content',
    },
    meta: {
      type: new GraphQLNonNull(MetaType),
      description: 'the time when the comment was created and updated',
    },
  }),
  interfaces: () => [nodeInterface],
});

export default CommentType;
