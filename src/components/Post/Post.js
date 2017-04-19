/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Relay from 'react-relay';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Post.css';
import Footer from '../Footer';

const contextTypes = {
  relay: Relay.PropTypes.Environment,
};

const propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};


function Post(props) {
  const { title, content, created }
      = props.post;
  const createdAt = new Date(created);
  const createdString = `${createdAt.getFullYear()}年${createdAt.getMonth() + 1}月${createdAt.getDate()}日`;
  return (
    <div className={s.contentWrapper}>
      <Link to="/posts" className={s.goBack} >
        <i className="fa fa-home" />
      </Link>
      <div className={s.postContainer}>
        <article>
          <header>
            <div className={s.postMeta}>
              <time
                dateTime={createdString}
                className={s.postDate}
              >
                {createdString}
              </time>
              <span className={s.postTag}>Tag here</span>
            </div>
            <h1 className={s.postTitle}>{title}</h1>
          </header>
          <main>
            {content}
          </main>
        </article>
        <div className={s.readMore}>
          <div className={cx(s.readMoreItem, s.readMoreItemLeft)}>
            <span className={s.readMoreItemDim}>上一篇文章</span>
            <h2 className={s.postListTitle}>
              <a href="/bing-wallpaper/" title="link to Node.js/PHP获取Bing每日壁纸">Node.js/PHP获取Bing每日壁纸</a>
            </h2>
          </div>

          <div className={cx(s.readMoreItem, s.readMoreItemRight)}>
            <span className={s.readMoreItemDim}>下一篇文章</span>
            <h2 className={s.postListTitle}>
              <a href="/jetbrains-license-server/" title="link to JetBrains License Server">JetBrains License Server</a>
            </h2>
          </div>
        </div>
        <section className={s.postComments}>
            here to be the comments on this article
          </section>
        <Footer />
      </div>
    </div>
  );
}

Post.propTypes = propTypes;
Post.contextTypes = contextTypes;

export default withStyle(s)(Post);
