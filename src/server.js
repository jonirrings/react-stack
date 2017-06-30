// @flow
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
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
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import { ServerFetcher } from './core/fetcher';
import { createResolver, historyMiddlewares, render, routeConfig } from './routes';
import { port, auth, databaseUrl, description } from './core/config';
import models from './data/models';
import schema from './data/schema';

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
app.use(express.static(path.resolve(__dirname, 'public')));
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
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
})));
//
// Register admin-only server-side rendering middleware
// -----------------------------------------------------------------------------
// app.get('/admin', renderOnServer(admin));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(port, () => {
      console.info(`The server is running at http://localhost:${port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./routes');
}

export default app;
