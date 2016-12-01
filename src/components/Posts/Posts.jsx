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
import cx from 'classnames';
import s from './Posts.css';

class Posts extends Component {
  static propTypes={
    route: PropTypes.object,
  };
  render() {
    const ulClass = this.props.route.path === 'posts' ? s.posts : cx(s.posts, s.init);
    return (
      <ul className={ulClass}>
        <li>TDB</li>
      </ul>
    );
  }
}

export default withStyle(s)(Posts);
