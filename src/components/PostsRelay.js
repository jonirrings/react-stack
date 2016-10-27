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
import Post from './Post';

class Posts extends Component {
  render() {
    const {edges} = this.props.posts;
    return (
      <div>
        <ul>
          {
            edges.map(edge =><li key={edge.cursor}><Post post={edge.node} /></li>)
          }
        </ul>
        <form >
          <input type="text" />
          <textarea name="postContent" defaultValue={'type any thing here'}>
          </textarea>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const PostsContainer = Relay.createContainer(Posts, {
  fragments: {
    posts: (variables ) => Relay.QL`
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
class PostsRoute extends Relay.Route {
  static queries = {
      posts: () => Relay.QL`query { posts(first:$num) }`,
  };
  static routeName = 'PostsRoute';
}
const RootContainer =
  (<Relay.RootContainer
    Component={PostsContainer}
    route={new PostsRoute({ num: 10 })}
  />);
export default RootContainer;
