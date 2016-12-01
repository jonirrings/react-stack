/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'babel-polyfill';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, match, Router } from 'react-router';
import Relay from 'react-relay';
import routes from './routes';
import ContextHolder from './components/ContextHolder';


const environment = new Relay.Environment();

environment.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  }));
const context = {
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  setTitle: (title) => {
    document.title = title;
    return document.title;
  },
};
const data = JSON.parse(document.getElementById('preloadData').textContent);

IsomorphicRelay.injectPreparedData(environment, data);

const rootElement = document.getElementById('root');
function initialRenderComplete() {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
}

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
    ReactDOM.render(
      <ContextHolder context={context}>
        <Router {...props} />
      </ContextHolder>,
      rootElement,
      () => initialRenderComplete(),
    );
  });
});
