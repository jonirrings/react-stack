/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.shape({
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
      content: PropTypes.string.isRequired,
      replyTo: PropTypes.object,
      created: PropTypes.number.isRequired,
      updated: PropTypes.number.isRequired,
    }),
  };
  render() {
    const { author: { name, avatar }, content, replyTo, created, updated } = this.props.comment;
    return (
      <div>
        <div>
          <img alt={`the avatar of ${name}`} src={avatar} />
          <strong>{name}</strong>
        </div>
        <div>
          <div>
            <strong>
              {replyTo ? `replyTo:${replyTo.author.name}` : ''}
            </strong>{content}
          </div>
          <span>created:{new Date(created)}&nbsp;|&nbsp;updated:{new Date(updated)}</span>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Comment, {
  fragments: {
    comment: Relay.QL`
            fragment on Comment{
                author{
                    name
                    avatar
                }
                content
                replyTo{
                    author{
                        name
                    }
                }
                created
                updated
            }
        `,
  },
});
