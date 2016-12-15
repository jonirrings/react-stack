/**
 * Created by JonirRings on 2016/12/2.
 */
import Relay from 'react-relay';

export default class AddPostMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{createPost}`;
  }
  getVariables() {
    return {
      title: this.props.title,
      content: this.props.content,
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddPostPayload{
        postEdge
        viewer{
          id
          posts
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
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}
