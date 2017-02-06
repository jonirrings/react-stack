/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

const propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    avatar: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }),
};

function Author(props) {
  const { name, avatar } = props.author;
  return (
    <div>
      <img alt={`the avatar of ${name}`} src={avatar} />
      <strong>{name}</strong>
    </div>
  );
}

Author.propTypes = propTypes;

export default Author;
