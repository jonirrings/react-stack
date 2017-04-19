/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Author from '../Author';

const propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.shape().isRequired,
  created: PropTypes.number.isRequired,
  updated: PropTypes.number.isRequired,
};

function Comment(props) {
  const { author, content, created, updated } = props;
  const createdAt = new Date(created);
  const updatedAt = new Date(updated);
  return (
    <div>
      <div>
        <Author author={author} />
      </div>
      <div>
        <div>{content}</div>
        <span>
            回复:{`${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()}`}
            &nbsp;|&nbsp;
            更新:{`${updatedAt.getFullYear()}/${updatedAt.getMonth() + 1}/${updatedAt.getDate()}`}
        </span>
      </div>
    </div>
  );
}
Comment.propTypes = propTypes;
export default Comment;
