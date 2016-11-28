/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../components/Layout';
import Welcome, { WelcomeQueries } from '../components/Welcome';
import Posts, { PostsQuery } from '../components/Posts';
import Post from '../components/Post';
import Publish from '../components/Publish';
import About from '../components/About';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Welcome} queries={WelcomeQueries} />
    <Route path="posts" component={Posts} queries={PostsQuery} />
    <Route path="post" component={Post} />
    <Route path="publish(/:id)" component={Publish} />
    <Route path="about" component={About} />
  </Route>
);
export default routes;
