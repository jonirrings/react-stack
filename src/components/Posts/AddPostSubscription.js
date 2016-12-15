import Relay from 'react-relay';
import { Subscription } from 'relay-subscriptions';

import Post from '../Post';

export default class AddTodoSubscription extends Subscription {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  };

  getVariables() {
    return {};
  }
  getSubscription() {
    return Relay.QL`
      subscription {
        addPostSubscription(input: $input) {
          postEdge {
            __typename
            node {
              ${Post.getFragment('post')}
            }
          }
          viewer {
            id
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'posts',
      edgeName: 'postEdge',
      rangeBehaviors: () => 'append',
    }];
  }
}
