/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Glance from '../Glance';
import s from './Posts.css';
import Footer from '../Footer';

const propTypes = {
  route: PropTypes.shape(),
  viewer: PropTypes.shape({
    user: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  }),
};

function Posts(props) {
  const { viewer, route } = props;
  const postClass = route.path === 'posts' ? s.posts : cx(s.posts, s.init);
  return (
    <div className={postClass}>
      <div className={s.postsContainer}>
        <ul className={s.postList}>
          {
            viewer.posts.edges.map(edge => <Glance post={edge.node} key={edge.cursor} />)
          }
        </ul>
        <Footer />
      </div>
    </div>
  );
}

Posts.propTypes = propTypes;

export default withStyle(s)(Posts);
