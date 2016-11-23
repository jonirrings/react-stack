/**
 * Created by JonirRings on 2016/11/23.
 */
import React, { Component, PropTypes } from 'react';

class Account extends Component{
  static propTypes={
    viewer: PropTypes.object,
  };
  render(){
    const viewer = this.props.viewer;
    return (
      <div>
        {viewer?viewer.name:''}
        <a href="/login/github">GitHub Login</a>
      </div>
    )
  }
}

export default Account;
