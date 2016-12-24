/**
 * Created by JonirRings on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Welcome.css';

class Welcome extends Component {
  static propTypes = {
    viewer: PropTypes.shape(),
  };

  static contextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
  };

  render() {
    const { user } = this.props.viewer;
    const { name = 'Visitor' } = user || {};
    this.context.setTitle(`Welcome,${name}--Jonir Rings`);
    return (
      <header className={s.panelCover}>
        <div className={s.panelMain}>
          <div className={s.home}><Link to="/" >Jonir Rings</Link></div>
          <p className={s.welcome}>Welcome,
            {
              user
                ?user.name
                :<a href="/login/github" title="login through github" rel="noopener noreferrer" target="_blank" >{name}</a>
            }
          </p>
          <div className={s.navContainer}>
            <nav className={s.navs}>
              <ul>
                <li><Link to="/">主页</Link></li>
                <li><Link to="/posts">博客</Link></li>
                <li><a href="http://resume.jonirrings.com">简历</a></li>
                <li><Link to="/about">关于</Link></li>
              </ul>
            </nav>
            <div className={s.social}>
              <ul>
                <li>
                  <a href="https://jonirrings.github.io/" title="交♂友" rel="noopener noreferrer" target="_blank">
                    <i className="fa fa-github" />
                    <span className={s.label}>Github</span>
                  </a>
                </li>
                <li>
                  <a href="http://weibo.com/jonirrings" title="微博" rel="noopener noreferrer" target="_blank">
                    <i className="fa fa-weibo" />
                    <span className={s.label}>Weibo</span>
                  </a>
                </li>
                <li>
                  <a
                    href="http://wpa.qq.com/msgrd?v=3&uin=312604054&site=qq&menu=yes" title="QQ"
                    rel="noopener noreferrer" target="_blank"
                  >
                    <i className="fa fa-qq" />
                    <span className={s.label}>QQ</span>
                  </a>
                </li>
                <li>
                  <a href="mailto://i@jonirrings.com" title="邮箱" rel="noopener noreferrer" target="_blank">
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
}

export default withStyle(s)(Welcome);

