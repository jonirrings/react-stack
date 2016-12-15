/**
 * Created by JonirRings on 2016/10/29.
 */

import React, { Component, PropTypes } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Glance.css';

class Glance extends Component {
  static propTypes={
    post: PropTypes.object.isRequired,
  };
  render() {
    const { title, content, created } = this.props.post;
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
}
export default withStyle(s)(Glance) ;
