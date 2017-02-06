/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';

const propTypes = {
  children: PropTypes.oneOfType(
    [
      PropTypes.element,
      PropTypes.array,
    ],
  ),
  nav: PropTypes.element,
  main: PropTypes.element,
};

function Layout(props) {
  return (
    <div className={s.root}>
      {props.children}
      {props.nav}
      {props.main}
    </div>
  );
}

Layout.propTypes = propTypes;

export default withStyle(s)(Layout);
