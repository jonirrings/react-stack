/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from 'react';
import Author from '../Author';

class Comment extends Component {
  render() {
    const {author, content, replyTo, created, updated} = this.props.comment;
    return (
      <div>
        <div>
          <Author author={author} />
        </div>
        <div>
          <div>
            <strong>
              {replyTo ? `replyTo:${replyTo.author.name}` : ''}
            </strong>{content}
          </div>
          <span>created:{new Date(created).toISOString().split('T')[0]}&nbsp;|&nbsp;
            updated:{new Date(updated).toISOString().split('T')[0]}</span>
        </div>
      </div>
    );
  }
}

export default Comment;
