/**
 * Created by JonirRings on 2016/10/29.
 */
import React,{Component} from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class Welcome extends Component{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };
  render(){
    return(
      <div>
        this is the welcome page, and it should post the host links
        <Link to='/posts'>BLOG</Link>
        <Link to='/about'>ABOUT</Link>
        <a href='http://resume.jonirrings.com'>RESUME</a>
        <a href='http://github.com/jonirrings'>GitUub</a>
      </div>
    )
  }
}

export default Welcome;
