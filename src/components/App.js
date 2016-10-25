/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return React.Children.only(this.props.children);
  }

}

export default App;
