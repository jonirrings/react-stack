import React from 'react';
import ReactDOM from 'react-dom/server';
import Promise from 'bluebird';
import path from 'path';
import mongoose from 'mongoose';
import express from 'express';
import expressGraphQL from 'express-graphql';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoDBStore from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import { getFarceResult } from 'found/lib/server';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import App from './components/App';
import Html from './components/Html';
import { ServerFetcher } from './core/fetcher';
import { createResolver, historyMiddlewares, render, routeConfig } from './router';
import { port, auth, databaseUrl, description } from './core/config';
import schema from './data/schema';

const isDebug = process.env.NODE_ENV !== 'production';
mongoose.Promise = Promise;
mongoose.connect(databaseUrl, { config: { autoIndex: false } });
const store = new (mongoDBStore(session))({
  uri: databaseUrl,
  collection: 'sessions',
});
// const db = mongoose.connection;
const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: auth.jwt.secret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  store,
  resave: true,
  saveUninitialized: true,
}));

app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: isDebug,
  rootValue: { request: req },
  pretty: isDebug,
})));
//
// Register admin-only server-side rendering middleware
// -----------------------------------------------------------------------------
// app.get('/admin', renderOnServer(admin));


// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get(async (req, res) => {
  const fetcher = new ServerFetcher(`http://localhost:${port}/graphql`);

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: createResolver(fetcher),
    render,
  });
  if (redirect) {
    res.redirect(302, redirect.url);
    return;
  }

  const css = new Set();
  const data = {
    title: description,
    description,
  };
  const context = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    },
    setDescription: (desc) => {
      data.description = desc;
    },
    setTitle: (title) => {
      data.title = title;
    },
  };
  data.children = ReactDOM.renderToString(<App context={context}>{element}</App>);
  data.styles = [
    { id: 'css', cssText: [...css].join('') },
  ];
  data.scripts = [assets.vendor.js, assets.client.js];
  data.fetcher = fetcher;
  const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
  res.status(status).send(html);
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = `<html><body>${err.message}</body></html>`;
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);// eslint-disable-line no-console
});
