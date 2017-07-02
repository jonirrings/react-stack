// @flow

import React from 'react';
import Link from 'found/lib/Link';

import type { Author, Meta } from '../../data/FlowTypes';

type Props = {
  author: Author,
  meta: Meta,
  id: string,
  title: string,
  content: string,
}

export default function Preview(props: Props) {
  const { author, meta, title, content, id } = props;
  return (
    <li>
      <div>
        <h6><Link to={`/post/${id}`}>{title}</Link></h6>
        <p>
          {author.name}
          {meta.created}
        </p>
        <p>
          {content}
        </p>
      </div>
    </li>
  );
}
