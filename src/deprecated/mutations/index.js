/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';

import UserUpdateMutation from './user/update';

import PostCreateMutation from './post/create';
import PostUpdateMutation from './post/update';
import PostDeleteMutation from './post/delete';

import CaptchaCreateMutation from './captcha/create';
import CaptchaUpdateMutation from './captcha/update';
import CaptchaDeleteMutation from './captcha/delete';

import CommentCreateMutation from './comment/create';
import CommentUpdateMutation from './comment/update';
import CommentDeleteMutation from './comment/delete';

const mutationType = new ObjectType({
  name: 'Mutation',
  fields: {
    updateUser: UserUpdateMutation,
    createPost: PostCreateMutation,
    updatePost: PostUpdateMutation,
    deletePost: PostDeleteMutation,
    createCaptcha: CaptchaCreateMutation,
    updateCaptcha: CaptchaUpdateMutation,
    deleteCaptcha: CaptchaDeleteMutation,
    createComment: CommentCreateMutation,
    updateComment: CommentUpdateMutation,
    deleteComment: CommentDeleteMutation,
  },
});
export default mutationType;
