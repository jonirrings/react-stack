/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Relay from 'react-relay';
import React, { Component, PropTypes } from 'react';
import {PostContainer} from './Post';

class PostsRoute extends Relay.Route {
  static queries = {
    posts: () => Relay.QL`query { posts(first:$num) }`,
  };
  static routeName = 'PostsRoute';
}
class Posts extends Component {
  render() {
    const posts = this.props.posts;
    return (
      <div>
        {
          posts.edges.map(node => <Post key={node.id} {...node} />)
        }
      </div>
    );
  }
}
const PostsContainer = Relay.createContainer(Posts, {
  fragments: {
    posts: () => Relay.QL`
            fragment on PostConnection{
                edges{
                    node{
                        id
                        ${PostContainer.getFragment('post')}
                    }
                }
            }
        `,
  },
});
const RootContainer =
  (<Relay.RootContainer
    Component={PostsContainer}
    route={new PostsRoute({ num: 1 })}
  />);
export default RootContainer;
