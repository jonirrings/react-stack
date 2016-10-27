/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'react';
import ReactDOM from 'react-dom';
// import TestComp from './components/TestComp';
import Posts from './components/PostsRelay';

const container = document.getElementById('inner');
ReactDOM.render(Posts, container);
