/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { analytics } from '../config';

function Html({ title, description, style, scripts, data, children }) {
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="//fonts.jonirrings.com/css?family=Josefin+Sans|Nixie+One|Noto+Sans|Open+Sans|Poiret+One|Rajdhani|Rokkitt|Titillium+Web" rel="stylesheet" />
        {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        {
          data &&
          <script id="preloadData" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        }
        {scripts && scripts.map(script => <script key={script} src={script} />)}
        {analytics.google.trackingId &&
        <script
          dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
        />
        }
        {analytics.google.trackingId &&
        <script src="https://www.google-analytics.com/analytics.js" async defer />
        }
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  children: PropTypes.string.isRequired,
};

export default Html;
