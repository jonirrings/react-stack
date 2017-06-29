// @flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Link from 'found/lib/Link';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import type { Author, Blogger } from '../../data/FlowTypes';

type Props = {
  viewer: {user: ?Author},
  blogger: Blogger,
};

function Home(props: Props) {
  const user = props.viewer.user;
  const { resume, github, qq, weibo, email } = props.blogger;
  return (
    <header className={s.panelCover}>
      <div className={s.panelMain}>
        <div className={s.home}><Link to="/" >Jonir Rings</Link></div>
        <p className={s.welcome}>Welcome,
          {
            user
              ? user.name
              : <a href="/login/github" title="login through github" rel="noopener noreferrer" target="_blank" >Visitor</a>
          }
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
    </header>
  );
}

export default createFragmentContainer(withStyle(s)(Home), {
  viewer: graphql`
    fragment Home_viewer on Viewer{
      user{
        name
      }
    }
  `,
  blogger: graphql`
    fragment Home_blogger on Blogger{
      resume
      github
      qq
      weibo
      email
    }
  `,
});
