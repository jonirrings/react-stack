/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        {React.Children.only(this.props.children)}
      </div>
    );
  }

}

export default withStyle(s)(Layout);
