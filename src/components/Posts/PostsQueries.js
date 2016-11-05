/**
 * Created by JonirRings on 2016/11/5.
 */
import Relay from 'react-relay';

export default {
  posts: () => Relay.QL`query { posts }`,
};
