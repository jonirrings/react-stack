/**
 * Created by JonirRings on 2016/10/29.
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Glance.css';

function Glance(props) {
  const { title, url, content, created } = props.post;
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
Glance.propTypes = {
  post: PropTypes.shape().isRequired,
};

export default withStyle(s)(Glance);
