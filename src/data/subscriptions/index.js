/**
 * Created by peterf on 2016/11/21.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';

const subscriptionType = new ObjectType({
  name: 'Subscription',
  fields: {
    // TODO add subscription
  },
});

export default subscriptionType;
