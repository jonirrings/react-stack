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
import Welcome from '../components/Welcome';
import ViewerQueries from '../components/ViewerQueries';
import Posts from '../components/Posts';
import Post, { PostNotFound } from '../components/Post';
import About from '../components/About';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute
      components={{ nav: Welcome, main: Posts }}
      queries={{ nav: ViewerQueries, main: ViewerQueries }}
    />
    <Route
      path="posts"
      components={{ nav: Welcome, main: Posts }}
      queries={{ nav: ViewerQueries, main: ViewerQueries }}
    />
    <Route path="post">
      <Route
        path=":url"
        components={{ nav: Welcome, main: Post }}
        queries={{ nav: ViewerQueries, main: ViewerQueries }}
        prepareParams={(params, { location }) => ({ url: location.pathname.split('/')[1] })}
      />
      <Route
        path="*"
        components={{ nav: Welcome, main: PostNotFound }}
        queries={{ nav: ViewerQueries }}
      />
    </Route>
    <Route path="about" component={About} />
  </Route>
);
export default routes;
