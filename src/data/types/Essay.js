/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLInterfaceType as InterfaceType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import User from './User';

const EssayInterface = new InterfaceType({
  name: 'Essay',
  description: 'An interface that post and share with the common fields',
  fields: {
    author: {
      type: User,
      description: 'who wrote the essay',
    },
    content: {
      type: StringType,
      description: 'what it wrote down',
    },
    created: {
      type: IntType,
      description: 'when the essay was wrote',
    },
  },
});

export default EssayInterface;
