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
  GraphQLString as StringType,
} from 'graphql';
import ViewerType from '../../../data/types/Viewer';
import { nodeField, PostType } from '../../../data/types/index';
import getViewer from '../../biz/Viewer';
import { getPostByUrl } from '../../biz/Post';

const queryType = new ObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: new NonNull(ViewerType),
      description: 'the viewer\'s information',
      resolve: getViewer,
    },
    post: {
      type: PostType,
      description: 'to query a post by its *url*',
      args: {
        url: {
          name: 'url',
          description: 'the url of specific post',
          type: new NonNull(StringType),
        },
      },
      resolve: getPostByUrl,
    },
    node: nodeField,
  },
});

export default queryType;
