/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';

import Captcha from '../types/Captcha';
import User from '../types/User';
import Post from '../types/Post';
import Stat from '../types/Stat';

const queryType = new ObjectType({
  name: 'Query',
  fields: {
    captcha: { type: Captcha },
    user: {
      type: User,
      description: 'users info stored in DB',
    },
    post: {
      type: Post,
      description: 'posts stored in DB',
    },
    stat: {
      type: Stat,
      description: 'pages read info in DB',
    },
  },
});

export default queryType;
