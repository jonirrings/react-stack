import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import React from 'react';
import { graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import NotFound from './not-found';

import App from '../components/App';

const About = import(/* webpackChunkName: 'about' */'./about').then(module => module.default);
const Admin = import(/* webpackChunkName: 'admin' */'./admin').then(module => module.default);
const Home = import(/* webpackChunkName: 'home' */'./home').then(module => module.default);
const Login = import(/* webpackChunkName: 'login' */'./login').then(module => module.default);
const Post = import(/* webpackChunkName: 'post' */'./post').then(module => module.default);
const Posts = import(/* webpackChunkName: 'posts' */'./posts').then(module => module.default);

// const NotFound =
// import(/* webpackChunkName: 'not-found' */'./not-found').then(module => module.default);

export const historyMiddlewares = [queryMiddleware];

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}

const BloggerQuery = graphql`
  query routes_Blogger_Query{
    blogger{
      ...Home_blogger
    }
    viewer{
      ...Home_viewer
    }
  }
`;
// ugly, refactor needed
const PostsQuery = graphql`
  query routes_Posts_Query($count: Int, $cursor: String){
    viewer{
      ...Posts_viewer
    }
  }
`;

const PostQuery = graphql`
  query routes_Post_Query($id: ID!){
    post: node(id:$id){
      ...Post_post
    }
  }
`;

export const routeConfig = makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={Home} query={BloggerQuery}>
      <Route path="about" Component={About} />
      <Route
        path="posts"
        Component={Posts}
        query={PostsQuery}
        prepareVariables={params => ({ ...params, count: 5, cursor: null })}
      />
      <Route path="post/:id" Component={Post} query={PostQuery} />
    </Route>
    <Route path="admin" Component={Admin} />
    <Route path="login" Component={Login} />
  </Route>,
);

export const render = createRender({
  renderError: ({ error }) =>  // eslint-disable-line react/prop-types
    (
      <NotFound code={error.status} />
    )
  ,
});
