/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cursorForObjectInConnection } from 'graphql-relay';
import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { PostEdge, PostType } from '../../types';
import ViewerType from '../../types/Viewer';
import { getPosts } from '../../../biz/Post';

const subscription = subscriptionWithClientId({
  name: 'AddPostSubscription',
  outputFields: {
    post: {
      type: PostType,
      resolve: post => post,
    },
    postEdge: {
      type: PostEdge,
      resolve: post => ({
        cursor: cursorForObjectInConnection(getPosts(), post),
        node: post,
      }),
    },
    viewer: {
      type: ViewerType,
      resolve(post, { user }) { return { ...user, posts: getPosts() }; },
    },
  },
  subscribe: (input, context) => {
    context.subscribe('add_post');
  },
});

export default subscription;
