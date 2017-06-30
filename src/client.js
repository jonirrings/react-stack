import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import deepForceUpdate from 'react-deep-force-update';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { updateMeta } from './core/DOMUtils';
import { ClientFetcher } from './core/fetcher';
import { createResolver, historyMiddlewares, render, routeConfig }
  from './routes';

/* eslint-disable global-require */

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  setDescription: (description) => {
    updateMeta('description', description);
    // Update necessary tags in <head> at runtime here, ie:
    // updateMeta('keywords', route.keywords);
    // updateCustomMeta('og:url', route.canonicalUrl);
    // updateCustomMeta('og:image', route.imageUrl);
    // updateLink('canonical', route.canonicalUrl);
    // etc.
  },
  setTitle: (title) => {
    document.title = title;
  },
};

const onRenderComplete = function initialRenderComplete() {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
};

const container = document.getElementById('app');
let appInstance;

(async () => {
  // eslint-disable-next-line no-underscore-dangle
  const fetcher = new ClientFetcher('/graphql', window.__RELAY_PAYLOADS__);
  const resolver = createResolver(fetcher);

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig,
    resolver,
    render,
  });

  appInstance = ReactDOM.render(
    <App context={context}>
      <Router resolver={resolver} />
    </App>,
    container,
    () => { onRenderComplete(); },
  );
})();

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes', () => {
    if (appInstance) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }
  });
}
