// @flow
import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';

import s from './Page.css';
import Footer from '../Footer';

type Props = {
  children: any,
}

function Page(props: Props) {
  return (
    <main className={s.Page}>
      {props.children}
      <Footer />
    </main>
  );
}

export default withStyle(s)(Page);
