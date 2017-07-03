// @flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import Article from '../../components/Article';
import Page from '../../components/Page';
import type { Post as FlowPost } from '../../data/FlowTypes';

type Props = {
  post: FlowPost,
}

function Post(props: Props) {
  const post = props.post;
  return (
    <Page>
      <Article {...post} />
    </Page>
  );
}

export default createFragmentContainer(
  Post,
  {
    post: graphql`
      fragment Post_post on Post{
        id
        author{
          name
        }
        title
        content
        meta{
          created
          updated
        }
      }
    `,
  },
);
