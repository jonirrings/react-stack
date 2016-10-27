/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {Component, PropTypes} from 'react';

class User extends Component{
  render(){
    const {name,avatar} = this.props.author;
    return(
      <div>
        <img alt={`the avatar of ${name}`} src={avatar}/>
        <strong>{name}</strong>
      </div>
    )
  }
}

export default User;
