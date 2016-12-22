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
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';
import extend from 'extend';
import DateType from './custom/Date';
import { getUserById } from '../../biz/User';
import { getPostById } from '../../biz/Post';
import { getCommentById } from '../../biz/Comment';
import { getStaticById } from '../../biz/Static';
import { getCaptchaById } from '../../biz/Captcha';

export class CaptchaClass {}
export class CommentClass {}
export class PostClass {}
export class StaticClass {}
export class UserClass {}

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Captcha') {
      return getCaptchaById(id)
        .then(captcha => extend(new CaptchaClass(), captcha.toObject()));
    } else if (type === 'Comment') {
      return getCommentById(id)
        .then(comment => extend(new CommentClass(), comment.toObject()));
    } else if (type === 'Post') {
      return getPostById(id)
        .then(post => extend(new PostClass(), post.toObject()));
    } else if (type === 'User') {
      return getUserById(id)
        .then(user => extend(new UserClass(), user.toObject()));
    } else if (type === 'Static') {
      return getStaticById(id)
        .then(statics => extend(new StaticClass(), statics.toObject()));
    }
    return null;
  },
  (obj) => {
    if (obj instanceof CaptchaClass) {
      return CaptchaType; // eslint-disable-line no-use-before-define
    } else if (obj instanceof CommentClass) {
      return CommentType; // eslint-disable-line no-use-before-define
    } else if (obj instanceof PostClass) {
      return PostType; // eslint-disable-line no-use-before-define
    } else if (obj instanceof UserClass) {
      return UserType; // eslint-disable-line no-use-before-define
    } else if (obj instanceof StaticClass) {
      return StaticType; // eslint-disable-line no-use-before-define
    }
    return null;
  },
);

export const UserType = new ObjectType({
  name: 'User',
  description: 'A user is who bond its social account',
  fields: () => ({
    id: globalIdField('User', user => user._id), // eslint-disable-line no-underscore-dangle
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
      type: PostConnection, // eslint-disable-line no-use-before-define
      description: 'posts the user has wrote',
      args: connectionArgs,
      resolve: (user, args) =>
        connectionFromPromisedArray(Promise.all(user.posts.map(id => getPostById(id))), args),
    },
    comments: {
      type: CommentConnection, // eslint-disable-line no-use-before-define
      description: 'comments the user has wrote',
      args: connectionArgs,
      resolve: (user, args) =>
        connectionFromPromisedArray(Promise.all(user.comments.map(id => getPostById(id))), args),
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
    id: globalIdField('Post', post => post._id), // eslint-disable-line no-underscore-dangle
    author: {
      type: new NonNull(UserType),
      description: 'who wrote the post',
      resolve: post => getUserById(post.author),
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
      type: CommentConnection, // eslint-disable-line no-use-before-define
      args: connectionArgs,
      resolve: (post, args) =>
        connectionFromPromisedArray(Promise.all(post.comments.map(id => getPostById(id))), args),
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
    id: globalIdField('Captcha', captcha => captcha._id), // eslint-disable-line no-underscore-dangle
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
    id: globalIdField('Comment', comment => comment._id), // eslint-disable-line no-underscore-dangle
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
export const StaticType = new ObjectType({
  name: 'Static',
  description: 'A stat is the statics on how long one stays on one page',
  fields: () => ({
    id: globalIdField('Static', stat => stat._id), // eslint-disable-line no-underscore-dangle
    user: { type: new NonNull(UserType) },
    post: { type: new NonNull(PostType) },
    long: { type: new NonNull(IntType) },
  }),
  interfaces: [nodeInterface],
});
export const { connectionType: StaticConnection, edgeType: StaticEdge } = connectionDefinitions({
  name: 'Static',
  nodeType: StaticType,
});
