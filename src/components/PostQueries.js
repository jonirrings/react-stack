/**
 * Created by peterf on 2016/11/21.
 */
import Relay from 'react-relay';

export default {
  post: () => Relay.QL`query { post(url:$url) }`,
};
