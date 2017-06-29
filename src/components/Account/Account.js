/**
 * Created by JonirRings on 2016/11/23.
 */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }).isRequired,
};

function Account(props) {
  const { user } = props;
  return (
    <div>
      {
        user
          ? user.name
          : <a href="/login/github">GitHub Login</a>
      }
    </div>
  );
}

Account.propTypes = propTypes;

export default Account;
