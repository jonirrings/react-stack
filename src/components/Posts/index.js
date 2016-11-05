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
import Post from '../Post';

const PostsContainer = Relay.createContainer(Posts, {
  fragments: {
    posts: variables => Relay.QL`
            fragment on PostConnection{
                edges{
                    cursor
                    node{
                        ${Post.getFragment('post')}
                    }
                }
            }
        `,
  },
});

export default PostsContainer;
