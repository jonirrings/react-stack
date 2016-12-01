/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes, Component } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.element,
    nav: PropTypes.element,
    main: PropTypes.element,
  };

  render() {
    return (
      <div className={s.root}>
        {this.props.children}
        {this.props.nav}
        {this.props.main}
      </div>
    );
  }

}

export default withStyle(s)(Layout);
