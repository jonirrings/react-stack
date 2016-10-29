/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


class PostsRoute extends Relay.Route {
  static queries = {
      posts: () => Relay.QL`query { posts(first:$num) }`,
  };
  static routeName = 'PostsRoute';
}
const RootContainer =
  (<Relay.RootContainer
    Component={PostsContainer}
    route={new PostsRoute({ num: 10 })}
  />);
export default RootContainer;
