// @flow
import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';

import s from './Layout.css';
import Navigation from '../Navigation';
import type { Author, Blogger } from '../../data/FlowTypes';

type Props = {
  blogger: Blogger,
  user: ?Author,
  children: ?any,
}

function Layout(props: Props) {
  const { blogger, user, children } = props;
  return (
    <div className={s.Layout}>
      <Navigation {...blogger} user={user} />
      {children || ''}
    </div>
  );
}

Layout.defaultProps = {
  user: { name: 'Visitor' },
  children: null,
};

export default withStyle(normalizeCss, s)(Layout);
