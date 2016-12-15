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
import Glance from '../Glance';
import s from './Posts.css';

class Posts extends Component {
  static propTypes={
    route: PropTypes.shape(),
    viewer: PropTypes.object,
  };
  render() {
    const { viewer, route } = this.props;
    const postClass = route.path === 'posts' ? s.posts : cx(s.posts, s.init);
    return (
      <div className={postClass}>
        <div className={s.postsContainer}>
          <ul className={s.postList}>
            {
              viewer.posts.edges.map(edge => <Glance post={edge.node} key={edge.cursor} />)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyle(s)(Posts);
