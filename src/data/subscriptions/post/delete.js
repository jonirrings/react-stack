/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import { GraphQLID as IDType } from 'graphql';
import { subscriptionWithClientId } from 'graphql-relay-subscription';
import ViewerType from '../../types/Viewer';
import getViewer from '../../../biz/Viewer';

const subscription = subscriptionWithClientId({
  name: 'DeletePostSubscription',
  outputFields: {
    deletedPostId: {
      type: IDType,
      resolve: ({ id }) => id,
    },
    viewer: {
      type: ViewerType,
      resolve: getViewer,
    },
  },
  subscribe: (input, context) => {
    context.subscribe('delete_post');
  },
});

export default subscription;
