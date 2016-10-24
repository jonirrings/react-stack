/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import { getCaptchaById, getUserById, getEssayById, getStatById } from '../models';
import {
  Captcha, Comment, Post, Stat, User,
  CaptchaType, CommentType, PostType, StatType, UserType,
} from '../types';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Captcha') {
      return getCaptchaById(id);
    } else if (type === 'Comment') {
      return getEssayById(id);
    } else if (type === 'Post') {
      return getEssayById(id);
    } else if (type === 'User') {
      return getUserById(id);
    } else if (type === 'Stat') {
      return getStatById(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Captcha) {
      return CaptchaType;
    } else if (obj instanceof Comment) {
      return CommentType;
    } else if (obj instanceof Post) {
      return PostType;
    } else if (obj instanceof User) {
      return UserType;
    } else if (obj instanceof Stat) {
      return StatType;
    }
    return null;
  }
);

export { nodeField, nodeInterface };
