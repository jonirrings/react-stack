// @flow

import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';

import s from './Header.css';
import type { Author, Meta } from '../../data/FlowTypes';

type Props = {
  title: string,
  author: Author,
  meta: Meta,
}

function Header(props: Props) {
  const { title, author, meta } = props;
  return (
    <head className={s.Header}>
      <h2>{title}</h2>
      <section>
        Author: {author.name}
        CreatedAt: {meta.created}
        UpdatedAt: {meta.updated}
      </section>
    </head>
  );
}

export default withStyle(s)(Header);
