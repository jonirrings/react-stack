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
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

import Post from './Post';
import User from './User';

const StatType = new ObjectType({
  name: 'Stat',
  description: 'A stat is the statics on how long one stays on one page',
  fields: () => ({
    user: { type: new NonNull(User) },
    post: { type: new NonNull(Post) },
    long: { type: new NonNull(IntType) },
  }),
});

export default StatType;
