/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Relay from 'react-relay';
import Glance from './Glance';

export default Relay.createContainer(Glance, {
  fragments: {
    post: () => Relay.QL`
        fragment on Post{
            title
            content
            created
        }
    `,
  },
});
