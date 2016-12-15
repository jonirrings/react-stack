/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Relay from 'react-relay';
import RelaySubscriptions from 'relay-subscriptions';
import Glance from '../Glance';
import Posts from './Posts';
import AddPostSubscription from './AddPostSubscription';

export default RelaySubscriptions.createContainer(Posts, {
  initialVariables: { first: 10 },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer{
        posts(first:$first){
          edges{
            node{
              ${Glance.getFragment('post')}
            }
            cursor
          }
        }
      }
    `,
  },
  subscriptions: [
    ({ viewer }) => new AddPostSubscription({ viewer }),
  ],
});
