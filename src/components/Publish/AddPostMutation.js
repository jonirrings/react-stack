/**
 * Created by JonirRings on 2016/12/2.
 */
import Relay from 'react-relay';

export default class AddPostMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{createPost}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddPostPayload{
        postEdge
      }
    `;
  }
}
