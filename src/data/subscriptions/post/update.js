/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLID as IDType,
} from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { PostType } from '../../types';
import ViewerType from '../../types/Viewer';
import { getPosts } from '../../../biz/Post';

const subscription = subscriptionWithClientId({
  name: 'UpdatePostSubscription',
  inputFields: {
    id: { type: new NonNull(IDType) },
    name: { type: new NonNull(StringType) },
    avatar: { type: new NonNull(StringType) },
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: post => post,
    },
    viewer: {
      type: ViewerType,
      resolve(post, { user }) { return { ...user, posts: getPosts() }; },
    },
  },
  subscribe: ({ id }, context) => {
    context.subscribe(`update_post_${fromGlobalId(id).id}`);
  },
});

export default subscription;
