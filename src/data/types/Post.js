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
  GraphQLList as ListType,
} from 'graphql';
import User from './User';
// import Essay from './Essay';
import Comment from './Comment';

const PostType = new ObjectType({
  name: 'Post',
  description: 'A Post is an article with comments',
  fields: () => ({
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
      type: new ListType(Comment),
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
  // interfaces: [Essay],
});

export default PostType;
