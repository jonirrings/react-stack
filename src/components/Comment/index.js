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
import Comment from './Comment';

export default RelaySubscriptions.createContainer(Comment, {
  fragments: {
    comment: () => Relay.QL`
            fragment on Comment{
                id
                author{
                    name
                    avatar
                }
                content
                replyTo{
                    author{
                        name
                    }
                }
                created
                updated
            }
        `,
  },
});
