/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {GraphQLObjectType as ObjectType} from 'graphql';
import {
  CaptchaType, PostType, StatType, UserType,
} from '../types';
import { nodeField} from '../types/Interface';

const queryType = new ObjectType({
  name: 'Query',
  fields: {
    captcha: {
      type: CaptchaType,
      description: 'captcha info stored in DB'
    },
    user: {
      type: UserType,
      description: 'users info stored in DB',
    },
    post: {
      type: PostType,
      description: 'posts stored in DB',
    },
    stat: {
      type: StatType,
      description: 'pages read info in DB',
    },
    node: nodeField,
  },
});

export default queryType;
