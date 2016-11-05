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


class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    // TODO add layout detail like nav,header,footer
    return (
      <div>
        {React.Children.only(this.props.children)}
      </div>
      );
  }

}

export default Layout;
