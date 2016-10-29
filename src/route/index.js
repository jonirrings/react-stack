/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO add component
export default [
  {
    path: '/',
    component: 'layout',
    queries: 'queris',
    indexRoute: {
      component: 'WELCOME',
      queries: 'queries',
    },
    childRoutes: [
      {
        path: 'posts',
        component: 'posts',
        queries: 'query',
      },
      {
        path: 'post/:id',
        component: 'post',
        queries: 'query',
      },
      {
        path: 'about',
        component: 'about',
        queries: 'query',
      },
      {
        path: 'publish',
        component: 'publish',
        queries: 'query',
        childRoutes: [
          {
            path: 'publish/:id',
            component: 'publish',
            queries: 'query',
          },
        ],
      },
    ],
  },
];
