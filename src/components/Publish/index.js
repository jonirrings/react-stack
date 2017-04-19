/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Relay from 'react-relay';
import Publish from './Editor';
import AddTodoMutation from './AddPostMutation';

export default Relay.createContainer(Publish, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer{
        user{
          id
          name          
        }
        ${AddTodoMutation.getFragment('viewer')}
      }
    `,
  },
});
