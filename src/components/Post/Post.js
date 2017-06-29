// @flow

import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import { Link } from 'react-router';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Post.css';
import Footer from '../Footer';
import type { Meta } from '../SharedType';

type Props = {
  post: {
    title: string,
    content: string,
    meta: Meta,
  },
  relay: {
    refetch: any | (fragmentVariables: any)=>any
  }
}

class Post extends Component {
  props: Props;
  loadMore() {
    const refetchVariables = fragmentVariables => ({
      count: fragmentVariables.count + 10,
      id: fragmentVariables.id,
    });
    this.props.relay.refetch(refetchVariables, null);
  }
  render() {
    const title = this.props.post.title;
    const content = this.props.post.content;
    const created = this.props.post.meta.created;
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
}

export default createRefetchContainer(
  withStyle(s)(Post),
  {
    post: graphql`
      fragment Post_post on Post{
        id
        author{
          ...Author_author
        }
        title
        content
        comments(first: $count){
          edges{
            node{
              ...Comment_comment
            }
          }
        }
        meta{
          created
          updated
        }
      }
    `,
  },
  graphql`
    query PostCommentsRefetchQuery($count: Int,$id: ID!){
      node(id: $id){
        ...Post_post
      }
    }
  `,
);
