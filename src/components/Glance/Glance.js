// @flow

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Glance.css';
import type { Meta } from '../SharedType';

type Props = {
  post: {
    title: string,
    url: string,
    content: string,
    meta: Meta,
  }
}

function Glance(props: Props) {
  const title = props.post.title;
  const url = props.post.url;
  const content = props.post.content;
  const created = props.post.meta.created;
  const createdAt = new Date(created);
  return (
    <li className={s.listItem}>
      <article className={s.article}>
        <h2 className={s.title}><Link to={`/post/${url}`}>{title}</Link></h2>
        <p className={s.excerpt}>{content.substr(0, 140)}</p>
        <div className={s.metaContainer}>
          <time className={s.time}>
            {`${createdAt.getFullYear()}年${createdAt.getMonth() + 1}月${createdAt.getDate()}日`}
          </time>
          <span className={s.meta}><i className="fa fa-eye" />18</span>
          <span className={s.meta}><i className="fa fa-comments" />12</span>
          <span className={s.readContainer}><Link className={s.read} to={`/post/${url}`}>Read</Link></span>
        </div>
      </article>
    </li>
  );
}

export default createFragmentContainer(withStyle(s)(Glance), {
  post: graphql`
    fragment Glance_post on Post{
      id
      url
      title
      content
      meta{
        created
        updated
      }
    }
  `,
});
