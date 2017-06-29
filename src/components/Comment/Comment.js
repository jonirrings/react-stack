// @flow

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Author from '../Author';
import type { Author as AuthorType, Meta } from '../SharedType';

type Props = {
  comment: {
    author: AuthorType,
    content: string,
    meta: Meta,
  }
}

function Comment(props: Props) {
  const author = props.comment.author;
  const content = props.comment.content;
  const created = props.comment.meta.created;
  const updated = props.comment.meta.updated;

  const createdAt = new Date(created);
  const updatedAt = new Date(updated);
  return (
    <div>
      <div>
        <Author author={author} />
      </div>
      <div>
        <div>{content}</div>
        <span>
            回复:{`${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()}`}
            &nbsp;|&nbsp;
            更新:{`${updatedAt.getFullYear()}/${updatedAt.getMonth() + 1}/${updatedAt.getDate()}`}
        </span>
      </div>
    </div>
  );
}

export default createFragmentContainer(
  Comment,
  {
    comment: graphql`
      fragment Comment_comment on Comment{
        id
        author{
          ...Author_author
        }
        content
        meta{
          created
          updated
        }
      }
    `,
  });
