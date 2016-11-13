/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';

process.argv.push('--watch');
const [config] = webpackConfig;

async function start() {
  await run(clean);
  await run(copy);
  await run(updateSchema);
  await new Promise(resolve => {
    if (config.debug) {
      config.entry = ['react-hot-loader/patch', 'webpack-hot-middleware/client', config.entry];
      config.output.filename = config.output.filename.replace('[chunkhash]', '[hash]');
      config.output.chunkFilename = config.output.chunkFilename.replace('[chunkhash]', '[hash]');
      config.module.loaders.find(x => x.loader === 'babel-loader').query.plugins.unshift('react-hot-loader/babel');
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
      config.plugins.push(new webpack.NoErrorsPlugin());
    }
    const bundler = webpack(webpackConfig);
    const wpMiddleWare = webpackMiddleWare(bundler, {
      publicPath: config.output.publicPath,
      state: config.stats,
    });
    const hotMiddleWare = webpackHotMiddleWare(bundler.compilers[0]);
    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();

      const server = await runServer();
      const bs = browserSync.create();
      bs.init({
        ...(config.debug ? {} : { notify: false, ui: false }),
        proxy: {
          target: server.host,
          middleware: [wpMiddleWare, hotMiddleWare],
        },
      }, resolve);
    };
    bundler.plugin('done', stats => handleBundleComplete(stats));
  });
}

export default start;
