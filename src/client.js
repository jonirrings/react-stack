/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import PostsRelay from './components/PostsRelay';

const container = document.getElementById('inner');

ReactDOM.render(<PostsRelay />, container);
