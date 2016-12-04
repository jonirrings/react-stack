/**
 * Created by peterf on 2016/11/21.
 */
import Relay from 'react-relay';

export default {
  viewer: () => Relay.QL`query { viewer }`,
};
