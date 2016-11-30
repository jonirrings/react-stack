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
import s from './Posts.css';

class Posts extends Component {
  render() {
    return (
      <ul className={s.posts}>
        <li>TDB</li>
      </ul>
    );
  }
}

export default withStyle(s)(Posts);
