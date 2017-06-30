// @flow
import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import Link from 'found/lib/Link';

import s from './Pagination.css';
import type { Rel } from '../../data/FlowTypes';

type Props = {
  prev: ?Rel,
  next: ?Rel,
}

function Pagination(props: Props) {
  const { prev, next } = props;
  return (
    <section className={s.Pagination}>
      {
        prev ?
          <div>
            <span>Prev</span>
            <Link to={prev.url}>{prev.title}</Link>
          </div>
          : ''
      }
      {
        next ?
          <div>
            <span>Next</span>
            <Link to={next.url}>{next.title}</Link>
          </div>
          : ''
      }
    </section>
  );
}

export default withStyle(s)(Pagination);
