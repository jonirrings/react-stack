/**
 * Created by JonirRings on 2016/10/29.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class Welcome extends Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };
  render() {
    return (
      <div>
        Welcome
        <div>
          <Link to="/posts">BLOG</Link> &nbsp;|&nbsp;
          <Link to="/about">ABOUT</Link>&nbsp;|&nbsp;
          <a href="http://resume.jonirrings.com">RESUME</a>&nbsp;|&nbsp;
          <a href="http://github.com/jonirrings">GitUub</a>
          <a href="/login/jwt">JWT</a> &nbsp;|&nbsp;
          <a href="/login/github">GitHub Login</a>
        </div>
      </div>
    );
  }
}

export default Welcome;
