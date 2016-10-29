/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import PostBrief from '../PostBrief';

class Posts extends Component {
  render() {
    const { edges } = this.props.posts;
    return (
      <div>
        <ul>
          {
            edges.map(edge => <li key={edge.cursor}><PostBrief post={edge.node} /></li>)
          }
        </ul>
      </div>
    );
  }
}

export default Posts;
