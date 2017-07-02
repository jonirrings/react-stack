// @flow

import React, { Component } from 'react';
import { createPaginationContainer, graphql } from 'react-relay';
import withStyle from 'isomorphic-style-loader/lib/withStyles';

import Preview from './Preview';
import s from './Posts.css';
import Footer from '../../components/Footer/index';
import type { Edge, PageInfo } from '../../data/FlowTypes';

type Props = {
  relay: {
    hasMore: ()=>boolean,
    loadMore: (
      pageSize: number,
      callback: (err: ?Error)=>void
    )=>void,
    isLoading: ()=>boolean,
  },
  viewer: {
    posts: {
      edges: Array<Edge>,
      pageInfo: PageInfo,
    }
  },
}

class Posts extends Component {
  props: Props;
  loadMore() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(
      10, // Fetch the next 10 feed items
      (e) => {
        console.error(e);
      },
    );
  }
  render() {
    const edges = this.props.viewer.posts.edges;
    const pageInfo = this.props.viewer.posts.pageInfo;
    return (
      <div className={s.posts}>
        <div className={s.postsContainer}>
          <ul className={s.postList}>
            {
              edges.map(edge => <Preview {...edge.node} key={edge.cursor} />)
          }
          </ul>
          <div>
            <button
              disabled={pageInfo.hasNextPage}
              onClick={() => { this.loadMore(); }}
            >next
            </button>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default createPaginationContainer(withStyle(s)(Posts), {
  viewer: graphql`
    fragment Posts_viewer on Viewer{
      posts(first: $count,after: $cursor)@connection(key:"Posts_posts"){
        edges{
          node{
            author{
              name
            }
            title
            content
            meta{
              created
            }
          }
          cursor
        }
        pageInfo{
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `,
}, {
  direction: 'forward',
  getConnectionFromProps: ({ viewer }) => viewer.posts,
  getFragmentVariables(prevVars, totalCount) {
    return {
      ...prevVars,
      count: totalCount,
    };
  },
  getVariables: (_, args) => args,
});
