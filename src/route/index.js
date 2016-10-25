/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

function Root({ user }) {
  return (
    <div>
      <div>
        <a href="/login/github">Login with GitHub</a>&nbsp;|&nbsp;<a href="/logout">Log Out</a>
      </div>
      <div>
        Loged:{user}
      </div>
    </div>
  );
}

Root.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Root;
