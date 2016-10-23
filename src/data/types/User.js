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
  GraphQLList as ListType,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

import Post from './Post';

// TODO to confirm the auth token of each and its auth info structure

const UserType = new ObjectType({
  name: 'User',
  description: 'A user is who bond its social account',
  fields: () => ({
    qq: {
      type: StringType,
      description: 'QQ',
    },
    weibo: {
      type: StringType,
      description: 'Sina Weibo',
    },
    facebook: {
      type: StringType,
      description: 'Facebook',
    },
    twitter: {
      type: StringType,
      description: 'Twitter',
    },
    google: {
      type: StringType,
      description: 'Google',
    },
    github: {
      type: StringType,
      description: 'GitHub',
    },
    avatar: {
      type: StringType,
      description: 'the avatar address of an user',
    },
    name: {
      type: new NonNull(StringType),
      description: 'a user\'s nickname chosen from social networks above',
    },
    essay: {
      type: new ListType(Post),
      description: 'what the user has wrote',
    },
    publisher: {
      type: new NonNull(BooleanType),
      description: 'whether the user can publish post',
    },
    created: {
      type: new NonNull(IntType),
      description: 'the time the user was created',
    },
    updated: {
      type: new NonNull(IntType),
      description: 'the time the user info was updated',
    },
  }),
});

export default UserType;
