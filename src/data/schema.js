/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GraphQLSchema } from 'graphql';
import query from './queries';
import mutation from './mutations';
// import subscription from './subscriptions';
//TODO add subscription
const schema = new GraphQLSchema({ query, mutation/*, subscription*/ });
export default schema;
