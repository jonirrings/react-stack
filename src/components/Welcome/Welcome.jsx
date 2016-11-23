/**
 * Created by JonirRings on 2016/10/29.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class Welcome extends Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };
  static propTypes={
    viewer: PropTypes.object,
  };
  render() {
    const viewer = this.props.viewer;
    return (
      <div>
        Welcome, {`${viewer ? viewer.name : 'Visitor'}`}
        <div>
          <Link to="/posts">BLOG</Link> &nbsp;|&nbsp;
          <Link to="/about">ABOUT</Link>&nbsp;|&nbsp;
          <a href="http://resume.jonirrings.com">RESUME</a>&nbsp;|&nbsp;
          <a href="http://github.com/jonirrings">GitUub</a>
        </div>
      </div>
    );
  }
}

export default Welcome;
