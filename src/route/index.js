/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';

class Root extends Component {
  render() {
    return (
      <div>
        <div>
          <a href="/login/github">Login with GitHub</a>
        </div>
        <div>
          <a href="/logout">Log Out</a>
        </div>
      </div>
  );
  }
}

export default Root;
