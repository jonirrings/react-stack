// @flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import type { Author, Blogger } from '../../data/FlowTypes';
import Layout from '../../components/Layout';

type Props = {
  viewer: { user: ?Author },
  blogger: Blogger,
  children: ?any;
};

function Home(props: Props) {
  const user = props.viewer.user;
  const blogger = props.blogger;
  const children = props.children;
  return (
    <Layout user={user} blogger={blogger}>
      {children || ''}
    </Layout>
  );
}

export default createFragmentContainer(Home, {
  viewer: graphql`
    fragment Home_viewer on Viewer{
      user{
        name
      }
    }
  `,
  blogger: graphql`
    fragment Home_blogger on Blogger{
      resume
      github
      qq
      weibo
      email
    }
  `,
});
