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
import Comment from './Comment';

class PostsRoute extends Relay.Route {
  static queries = {
    posts: () => Relay.QL`query { posts(first:$num) }`,
  };
  static routeName = 'PostsRoute';
}
class PostApp extends Component {
  static propTypes = {
    post: PropTypes.shape({
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      comments: PropTypes.array,
      created: PropTypes.number.isRequired,
      updated: PropTypes.number.isRequired,
    }),
  };
  render() {
    const { author: { name, avatar }, title, content, comments, created, updated } = this.props.post;
    return (
      <div>
        <div>
          <img alt={`the avatar of ${name}`} src={avatar} />
          <strong>{name}</strong>
        </div>
        <div>
          <title>{title}</title>
          <span>created:{new Date(created)}&nbsp;|&nbsp;updated:{new Date(updated)}</span>
        </div>
        <div>{content}</div>
        <div>
          {comments.edges.map(node => <Comment key={node.id} {...node} />)}
        </div>
      </div>
    );
  }
}
const PostContainer = Relay.createContainer(PostApp, {
  fragments: {
    post: Relay.QL`
        fragment on Post{
            author{
                name
                avatar
            }
            title
            content
            comments{
                edges{
                    node{
                        id
                        ${Component.getFragment('comment')}                        
                    }
                }
            }
            created
            updated
        }
    `,
  },
});
class Posts extends Component {
  render() {
    const posts = this.props.posts;
    return (
      <div>
        {
            posts.edges.map(node => <PostContainer key={node.id} {...node} />)
        }
      </div>
      );
  }
}
const PostsContainer = Relay.createContainer(Posts, {
  fragments: {
    posts: Relay.QL`
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
    route={new PostsRoute({ num: 10 })}
  />);
export default RootContainer;
