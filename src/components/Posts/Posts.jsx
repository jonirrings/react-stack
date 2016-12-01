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
    route: PropTypes.shape(),
  };
  render() {
    const postClass = this.props.route.path === 'posts' ? s.posts : cx(s.posts, s.init);
    return (
      <div className={postClass}>
        <div className={s.postsContainer}>
          <ul className={s.postList}>
            <li className={s.listItem}>
              <article className={s.article}>
                <h4>Jonir Rings&apos; Introduction to GraphQL </h4>
                <p>Content to be filled in Content to be
              filled in Content to be filled in Content t
              o be filled in Content to be filled in Conten
              t to be filled in Content to be filled in C
              onten
              t to be filled in Content to be filled in Con
              tent to b
              e filled in Content to be filled in Content to
               be filled in
              Content to be filled in Content to be filled in
              Content to be
              filled in Content to be filled in Content to be fi
              lled in Content
              to be filled in Content to be filled in </p>
                <div className={s.metaContainer}>
                  <time className={s.time}>2016/12/1</time>
                  <span className={s.meta}><i className="fa fa-eye" />18</span>
                  <span className={s.meta}><i className="fa fa-comments" />12</span>
                  <span className={s.readContainer}><a className={s.read} href="/post/this">Read</a></span>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyle(s)(Posts);
