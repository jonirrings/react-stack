/**
 * Created by JonirRings on 2016/10/29.
 */

import React, { PropTypes } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Glance.css';

function Glance(props) {
  const { title, content, created } = props.post;
  const creatdTime = new Date(created);
  return (
    <li className={s.listItem}>
      <article className={s.article}>
        <h4>{title}</h4>
        <p>{content}</p>
        <div className={s.metaContainer}>
          <time className={s.time}>
            {`${creatdTime.getFullYear()}/${creatdTime.getMonth() + 1}/${creatdTime.getDate()}`}
          </time>
          <span className={s.meta}><i className="fa fa-eye" />18</span>
          <span className={s.meta}><i className="fa fa-comments" />12</span>
          <span className={s.readContainer}><a className={s.read} href="/post/this">Read</a></span>
        </div>
      </article>
    </li>
  );
}
Glance.propTypes={
  post: PropTypes.shape().isRequired,
};

export default withStyle(s)(Glance) ;
