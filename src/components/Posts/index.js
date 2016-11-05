/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Relay from 'react-relay';
import Posts from './Posts';
import Glance from '../Glance';
import PostsQuery from './PostsQueries';

const PostsContainer = Relay.createContainer(Posts, {
  fragments: {
    posts: variables => Relay.QL`
            fragment on PostConnection{
                edges{
                    cursor
                    node{
                        ${Glance.getFragment('post')}
                    }
                }
            }
        `,
  },
});

export default PostsContainer;
export { PostsQuery };
