/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import Comment from '../Comment';
import s from './Post.css';

const contextTypes = {
  relay: Relay.PropTypes.Environment,
};

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  created: PropTypes.number.isRequired,
  updated: PropTypes.number.isRequired,
};

class Post extends Component {
  render() {
    const { title, content, comments, created, updated }
      = this.props.post;
    return (
      <div className={s.contentWrapper}>
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

class Post2 extends Component {

  handleComment({ replyTo, content }) {

  }

  render() {
    const { title, content, comments, created, updated }
      = this.props;
    const createdAt = new Date(created);
    const createdString = `${createdAt.getFullYear()}年${createdAt.getMonth() + 1}月${createdAt.getDate()}日`;
    return (
      <div className="content-wrapper">
        <article>
          <header>
            <div className="post-meta">
              <time dateTime={createdString} className="post-meta__date date">{createdString}</time>
              <span className="post-meta__tags tags">On</span>
            </div>
            <h1 className="post-title">webpack-init : 一款自用的webpack脚手架</h1>
          </header>
          <main>
            here is be the content of page
          </main>
        </article>
        <div className="read-more">
          <div className="read-more-item read-more-item-left">
            <span className="read-more-item-dim">上一篇文章</span>
            <h2 className="post-list__post-title post-title"><a href="/bing-wallpaper/" title="link to Node.js/PHP获取Bing每日壁纸">Node.js/PHP获取Bing每日壁纸</a></h2>
          </div>

          <div className="read-more-item read-more-item-right">
            <span className="read-more-item-dim">下一篇文章</span>
            <h2 className="post-list__post-title post-title"><a href="/jetbrains-license-server/" title="link to JetBrains License Server">JetBrains License Server</a></h2>
          </div>
        </div>
        <section className="post-comment">
          here to be the comments on this article
        </section>
        <footer className="footer">
          <span className="footer__copyright">&copy; 2017  All rights reserved.</span>
          <span className="footer__copyright">
            <a href="https://github.com/mcc108/mcno" target="_blank" rel="noopener noreferrer">Mcno</a>
            theme by &copy;
            <a href="https://congm.in" target="_blank" rel="noopener noreferrer">Cong Min</a></span>
        </footer>
      </div>
    );
  }
}

Post2.propTypes=propTypes;
Post2.contextTypes=contextTypes;

export default withStyle(s)(Post);
