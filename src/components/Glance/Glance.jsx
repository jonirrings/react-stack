/**
 * Created by JonirRings on 2016/10/29.
 */

import React, { Component, PropTypes } from 'react';

class Glance extends Component{
  render(){
    const {title,content} = this.props.post;
    return <div>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  }
}
export default Glance;
