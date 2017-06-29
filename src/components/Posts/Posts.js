// @flow

import React, { Component } from 'react';
import { createPaginationContainer, graphql } from 'react-relay';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import Glance from '../Glance';
import s from './Posts.css';
import Footer from '../Footer';
import type { Edge, PageInfo } from '../SharedType';

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
            edges.map(edge => <Glance post={edge.node} key={edge.cursor} />)
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
      posts(first: $count,after: $cursor)@connection(key:"Viewer_posts"){
        edges{
          node{
            ...Glance_post
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
  getVariables(props, { count, cursor }) {
    return {
      count,
      cursor,
    };
  },
  query: graphql`
    query PostsQuery($count:Int!,$cursor: String){
      viewer{
        ...Posts_viewer
      }
    }
  `,
});
