/**
 * Created by JonirRings on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Welcome.css';

class Welcome extends Component {
  static propTypes={
    viewer: PropTypes.shape(),
  };

  static contextType ={
    insertCss: PropTypes.func.isRequired,
  };

  render() {
    const viewer = this.props.viewer;
    return (
      <div className={s.panelCover}>
        <div className={s.navWrapper}>
          <div><Link to="/" className="">Jonir Rings</Link></div>
          <p>{ viewer ? viewer.name : 'Visitor' }</p>
          <div>
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
                  <a href="github" title="交♂友" rel="noopener noreferrer" target="_blank">
                    <i>X</i>
                    <span className="label">Github</span>
                  </a>
                </li>
                <li>
                  <a href="weibo" title="微博" rel="noopener noreferrer" target="_blank">
                    <i>X</i>
                    <span className="label">Weibo</span>
                  </a>
                </li>
                <li>
                  <a href="qq" title="QQ" rel="noopener noreferrer" target="_blank">
                    <i>X</i>
                    <span className="label">QQ</span>
                  </a>
                </li>
                <li>
                  <a href="mail" title="邮箱" rel="noopener noreferrer" target="_blank">
                    <i>X</i>
                    <span className="label">Email</span>
                  </a>
                </li>
                <li>
                  <a href="zhihu" title="知乎" rel="noopener noreferrer" target="_blank">
                    <i>X</i>
                    <span className="label">Zhihu</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={s.panelCoverOverlay} />
      </div>
    );
  }
}

export default withStyle(s)(Welcome);

