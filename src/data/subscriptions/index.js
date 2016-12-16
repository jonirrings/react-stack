/**
 * Created by peterf on 2016/11/21.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import AddPostSubscription from './post/create';
import RemovePostSubscription from './post/delete';
import UpdatePostSubscription from './post/update';

const Subscription = new ObjectType({
  name: 'Subscription',
  fields: {
    addPostSubscription: AddPostSubscription,
    removePostSubscription: RemovePostSubscription,
    updatePostSubscription: UpdatePostSubscription,
  },
});

export default Subscription;
