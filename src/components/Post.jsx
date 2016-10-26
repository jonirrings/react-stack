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
import {CommentContainer} from './Comment';

class Post extends Component {
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
    const { author: { name, avatar }, title, content, comments, created, updated }
      = this.props.post;
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
          {comments.edges.map(node => <CommentContainer key={node.id} {...node} />)}
        </div>
      </div>
    );
  }
}
const PostContainer = Relay.createContainer(Post, {
    fragments: {
        post: () => Relay.QL`
            fragment on Post{
                author{
                    name
                    avatar
                }
                title
                content
                comments(first:1){
                    edges{
                        node{
                            id
                            ${CommentContainer.getFragment('comment')}
                        }
                    }
                }
                created
                updated
            }
        `,
    },
});

export {Post,PostContainer} ;
