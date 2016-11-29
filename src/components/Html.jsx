/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

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
        <link href="//fonts.useso.com/css?family=Architects+Daughter" rel="stylesheet" />
        {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        {
          data &&
          <script id="preloadData" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        }
        {scripts && scripts.map(script => <script key={script} src={script} />)}
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string,
  scripts: PropTypes.array,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  children: PropTypes.string,
};

export default Html;
