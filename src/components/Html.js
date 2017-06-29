// @flow
/* eslint-disable react/no-danger */
import React from 'react';
import serialize from 'serialize-javascript';
import { analytics } from '../core/config';

type DefaultProps = {
  styles: [],
  scripts: [],
};
type Props = {
  title: string,
  description: string,
  styles: Array<{cssText: string, id: string}>,
  scripts: string[],
  fetcher: any,
  children: string,
};
type State = void;

const defaultProps = {
  styles: [],
  scripts: [],
};

class Html extends React.Component<DefaultProps, Props, State> {
  static defaultProps: DefaultProps = defaultProps;
  props: Props;
  render() {
    const { title, description, styles, scripts, fetcher, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script => <link key={script} rel="preload" href={script} as="script" />)}
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
        ))}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__RELAY_PAYLOADS__ = ${serialize(fetcher, { isJSON: true })}` }} />
          {scripts.map(script => <script key={script} src={script} />)}
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
}

export default Html;
