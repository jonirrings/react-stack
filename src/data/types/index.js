/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';
import DateType from './custom/Date';
import { getCaptchaById, getUserById, getPostById, getStatById } from '../models';

class CaptchaClass {}
class CommentClass {}
class PostClass {}
class StatClass {}
class UserClass {}

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Captcha') {
      return getCaptchaById(id);
    } else if (type === 'Comment') {
      return getPostById(id);
    } else if (type === 'Post') {
      return getPostById(id);
    } else if (type === 'User') {
      return getUserById(id);
    } else if (type === 'Stat') {
      return getStatById(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof CaptchaClass) {
      return CaptchaType;
    } else if (obj instanceof CommentClass) {
      return CommentType;
    } else if (obj instanceof PostClass) {
      return PostType;
    } else if (obj instanceof UserClass) {
      return UserType;
    } else if (obj instanceof StatClass) {
      return StatType;
    }
    return null;
  },
);

export const UserType = new ObjectType({
  name: 'User',
  description: 'A user is who bond its social account',
  fields: () => ({
    id: globalIdField('User'),
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
    posts: {
      type: PostConnection,
      description: 'posts the user has wrote',
      args: connectionArgs,
      resolve: (user, args) =>
        connectionFromPromisedArray(getPostsByAuthorId(user.id), args),
    },
    comments: {
      type: CommentConnection,
      description: 'comments the user has wrote',
      args: connectionArgs,
      resolve: (user, args) =>
        connectionFromPromisedArray(getCommentsByAuthorId(user.id), args),
    },
    publisher: {
      type: new NonNull(BooleanType),
      description: 'whether the user can publish post',
    },
    created: {
      type: new NonNull(DateType),
      description: 'the time the user was created',
    },
    updated: {
      type: new NonNull(DateType),
      description: 'the time the user info was updated',
    },
  }),
  interfaces: [nodeInterface],
});
export const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
export const PostType = new ObjectType({
  name: 'Post',
  description: 'A Glance is an article with comments',
  fields: () => ({
    id: globalIdField('Post'),
    author: {
      type: new NonNull(UserType),
      description: 'who wrote the post',
      resolve: post => findUserById(post.author),
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
      resolve: (post, args) =>
        connectionFromPromisedArray(getCommentsByPostId(post.id), args),
      // TODO modify to meet mongoose promise
      description: 'the comments on the posts',
    },
    visit: {
      type: new NonNull(IntType),
      description: 'the times the post been visited',
    },
    created: {
      type: new NonNull(DateType),
      description: 'the time post was wrote',
    },
    updated: {
      type: new NonNull(DateType),
      description: 'the time post was modified',
    },
  }),
  interfaces: [nodeInterface],
  // interfaces: [Glance],
});
export const { connectionType: PostConnection, edgeType: PostEdge } = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
export const CaptchaType = new ObjectType({
  name: 'Captcha',
  description: 'A CaptchaType is what verify the client whether is a human',
  fields: {
    id: globalIdField('Captcha'),
    base64: {
      type: new NonNull(StringType),
      description: 'the base64 image of a captcha',
    },
  },
  interfaces: [nodeInterface],
});
export const { connectionType: CaptchaConnection, edgeType: CaptchaEdge } = connectionDefinitions({
  name: 'Captcha',
  nodeType: CaptchaType,
});
export const CommentType = new ObjectType({
  name: 'Comment',
  description: 'Comment on a post and reply to other comment',
  fields: () => ({
    id: globalIdField('Comment'),
    author: {
      type: new NonNull(UserType),
      description: 'who wrote the comment',
    },
    content: {
      type: new NonNull(StringType),
      description: 'the content of the comment',
    },
    commentOn: {
      type: new NonNull(PostType),
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
});
export const { connectionType: CommentConnection, edgeType: CommentEdge } = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});
export const StatType = new ObjectType({
  name: 'Stat',
  description: 'A stat is the statics on how long one stays on one page',
  fields: () => ({
    id: globalIdField('Stat'),
    user: { type: new NonNull(UserType) },
    post: { type: new NonNull(PostType) },
    long: { type: new NonNull(IntType) },
  }),
  interfaces: [nodeInterface],
});
export const { connectionType: StatConnection, edgeType: StatEdge } = connectionDefinitions({
  name: 'Stat',
  nodeType: StatType,
});
