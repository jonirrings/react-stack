// @flow

import React from 'react';

import type { Author, Meta } from '../../data/FlowTypes';

type Props = {
  author: Author,
  meta: Meta,
  title: string,
  content: string,
}

export default function Preview(props: Props) {
  const { author, meta, title, content } = props;
  return (
    <article>
      <div>
        <h6>{title}</h6>
        <p>
          {author.name}
          {meta.created}
        </p>
        <p>
          {content}
        </p>
      </div>
    </article>
  );
}
