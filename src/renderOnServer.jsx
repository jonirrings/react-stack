/**
 * Created by JonirRings on 2016/10/30.
 */
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match } from 'react-router';
import Relay from 'react-relay';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import Html from './components/Html';
import ContextHolder from './components/ContextHolder';

const GRAPHQL_URL = 'http://localhost:3001/graphql';


export default (req, res, next) => {
  const networkLayer =
    new Relay.DefaultNetworkLayer(GRAPHQL_URL, {
      headers: { cookie: req.headers.cookie },
    });
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const css = new Set();
    const context = {
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
    };

    function render({ data, props }) {
      const children = ReactDOMServer.renderToString(
        <ContextHolder context={context}>{IsomorphicRouter.render(props)}</ContextHolder>
      );
      const title = 'Jonir Rings';
      const description = 'Jonir Tings\' blog';
      const scripts = [assets.vendor.js, assets.client.js];
      const html = ReactDOMServer
        .renderToStaticMarkup(
          <Html {...{ title, description, scripts, style: [...css].join(''), data, children }} />
        );
      res.status(200).send(`<!doctype html>${html}`);
    }

    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps, networkLayer).then(render).catch(next);
    } else {
      res.status(404).send('Not Found');
    }
  });
};
