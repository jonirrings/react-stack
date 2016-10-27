/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GraphQLObjectType as ObjectType, GraphQLID as IDType, GraphQLNonNull as NonNull } from 'graphql';
import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import {
  CaptchaType, PostType, StatType, UserType,
} from '../types';
import { nodeField } from '../types/Interface';
import { PostConnection } from '../types/Post';
import { getCaptchaById, getStatById } from '../models';
import { findUserById } from '../../biz/User';
import { getPosts, getPostById } from '../../biz/Post';

const queryType = new ObjectType({
  name: 'Query',
  fields: {
    captcha: {
      type: CaptchaType,
      description: 'captcha info stored in DB',
      args: {
        id: { type: new NonNull(IDType) },
      },
      resolve: (_, { id }) => getCaptchaById(id),
    },
    user: {
      type: UserType,
      description: 'users info stored in DB',
      args: {
        id: { type: new NonNull(IDType) },
      },
      resolve: (_, { id }) => findUserById(id),
    },
    post: {
      type: PostType,
      description: 'posts stored in DB',
      args: {
        id: { type: new NonNull(IDType) },
      },
      resolve: (_, { id }) => getPostById(id),
    },
    posts: {
      type: PostConnection,
      description: 'the posts in DB',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(getPosts(), args),
    },
    stat: {
      type: StatType,
      description: 'pages read info in DB',
      args: {
        id: { type: new NonNull(IDType) },
      },
      resolve: (_, { id }) => getStatById(id),
    },
    node: nodeField,
  },
});

export default queryType;
