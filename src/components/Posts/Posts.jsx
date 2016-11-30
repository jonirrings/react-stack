/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import Glance from '../Glance';
import s from './Posts.css';

class Posts extends Component {
  render() {
    const { edges } = this.props.posts;
    return (
      <ul className={s.posts}>
        {
          edges.map(edge => <li key={edge.cursor}><Glance post={edge.node} /></li>)
        }
      </ul>
    );
  }
}

export default withStyle(s)(Posts);
