/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};
//
// Common config for both client and server bundles
// ------------------------------------------------

const config = {
  context: path.resolve(__dirname, '../src'),
  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  ',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
        ],
        query: {
          cacheDirectory: DEBUG,
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: [
            'transform-runtime',
            ...DEBUG ? [] : [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements',
              'transform-react-inline-elements',
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            module: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash"base64:4]',
            minimize: !DEBUG,
          })}`,
          'postcss-loader?pack=default',
        ],
      }, {
        test: /\.scss$/,
        loaders: [
          'isomorhpic-style-loader',
          `css-loader?${JSON.stringify({ sourceMap: DEBUG, minimize: !DEBUG })}`,
          'postcss-loader?pack=scss',
          'sass-loader',
        ],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    root: path.resolve(__dirname, '../src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
  postcss(bundler) {
    return {
      default: [
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/jonathantneal/postcss-partial-import
        require('postcss-partial-import')({ addDependencyTo: bundler }),
        // Allow you to fix url() according to postcss to and/or from options
        // https://github.com/postcss/postcss-url
        require('postcss-url')(),
        // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
        // https://github.com/postcss/postcss-custom-properties
        require('postcss-custom-properties')(),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // W3C calc() function, e.g. div { height: calc(100px - 2em); }
        // https://github.com/postcss/postcss-calc
        require('postcss-calc')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // Unwraps nested rules like how Sass does it
        // https://github.com/postcss/postcss-nested
        require('postcss-nested')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
        // https://github.com/iamvdo/pleeease-filters
        require('pleeease-filters')(),
        // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
        // https://github.com/robwierzbowski/node-pixrem
        require('pixrem')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Postcss flexbox bug fixer
        // https://github.com/luisrudge/postcss-flexbugs-fixes
        require('postcss-flexbugs-fixes')(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
      sass: [
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
    };
  },
};

//
// Config for client side
//-----------------------

const clientConfig = extend(true, {}, config, {
  entry: './client.js',
  output: {
    filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': true }),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    ...DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: VERBOSE,
        },
      }),
    ],
  ],
  devtool: DEBUG ? 'source-map' : false,
});

//
// Config for server side
//-----------------------

const serverConfig = extend(true, {}, config, {
  entry: './server.js',
  output: {
    filename: '../../server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    /^\.\/assets$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
          !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],
  plugins: [
    new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': false }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
});

export default [
  clientConfig,
  serverConfig,
];