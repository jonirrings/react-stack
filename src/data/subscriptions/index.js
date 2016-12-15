/**
 * Created by peterf on 2016/11/21.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import GraphQLAddPostSubscription from './post/create';
import GraphQLRemovePostSubscription from './post/delete';
import GraphQLUpdatePostSubscription from './post/update';

const Subscription = new ObjectType({
  name: 'Subscription',
  fields: {
    addPostSubscription: GraphQLAddPostSubscription,
    removePostSubscription: GraphQLRemovePostSubscription,
    updatePostSubscription: GraphQLUpdatePostSubscription,
  },
});

export default Subscription;
