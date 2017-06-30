// @flow
import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import Link from 'found/lib/Link';

import s from './Navigation.css';
import type { Author, Blogger } from '../../data/FlowTypes';

type Props = Blogger & Author;

function Navigation(props: Props) {
  const { resume, github, qq, weibo, email, user: { name } } = props;
  return (
    <aside className={s.Navigation}>
      <div className={s.panelMain}>
        <div className={s.home}><Link to="/" >Jonir Rings</Link></div>
        <p className={s.welcome}>Welcome,
          {name}
        </p>
        <div className={s.navContainer}>
          <nav className={s.navs}>
            <ul>
              <li><Link to="/">主页</Link></li>
              <li><Link to="/posts">博客</Link></li>
              <li><a href={resume}>简历</a></li>
              <li><Link to="/about">关于</Link></li>
            </ul>
          </nav>
          <div className={s.social}>
            <ul>
              <li>
                <a href={github} title="交♂友" rel="noopener noreferrer" target="_blank">
                  <i className="fa fa-github" />
                  <span className={s.label}>Github</span>
                </a>
              </li>
              <li>
                <a href={weibo} title="微博" rel="noopener noreferrer" target="_blank">
                  <i className="fa fa-weibo" />
                  <span className={s.label}>Weibo</span>
                </a>
              </li>
              <li>
                <a href={`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`} title="QQ" rel="noopener noreferrer" target="_blank" >
                  <i className="fa fa-qq" />
                  <span className={s.label}>QQ</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} title="邮箱" rel="noopener noreferrer" target="_blank">
                  <i className="fa fa-envelope" />
                  <span className={s.label}>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.panelCoverOverlay} />
    </aside>
  );
}

export default withStyle(s)(Navigation);
