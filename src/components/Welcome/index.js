/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Relay from 'react-relay';
import Welcome from './Welcome';

export default Relay.createContainer(Welcome, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer{
        user{
          id
          name
        }
      }
    `,
  },
});
