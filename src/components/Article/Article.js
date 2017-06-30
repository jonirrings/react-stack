// @flow
import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';

import s from './Article.css';
import Header from '../Header';
import Pagination from '../Pagination';
import type { Author, Meta, Rel } from '../../data/FlowTypes';

type Props = {
  title: string,
  author: Author,
  meta: Meta,
  html: string,
  prev: ?Rel,
  next: ?Rel,
}

function Article(props: Props) {
  const { title, author, meta, html, prev, next } = props;
  return (
    <article className={s.Article}>
      <Header title={title} author={author} meta={meta} />
      <main
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Pagination prev={prev} next={next} />
    </article>
  );
}

export default withStyle(s)(Article);
