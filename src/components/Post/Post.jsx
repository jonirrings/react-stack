/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import Comment from '../Comment';
import Author from '../Author';

class Post extends Component {
  render() {
    const { author,title, content, comments, created, updated }
      = this.props.post;
    return (
      <div>
        <div>
          <Author author={author} />
        </div>
        <div>
          <title>{title}</title>
          <span>
            created:{new Date(created).toISOString().split('T')[0]}
            &nbsp;|&nbsp;
            updated:{new Date(updated).toISOString().split('T')[0]}
          </span>
        </div>
        <div>{content}</div>
        <div>
          <ul>
            {comments.edges.map(edge => <li key={edge.cursor}><Comment comment={edge.node} /></li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Post;


