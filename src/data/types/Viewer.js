// @flow
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';
import { connectionArgs } from 'graphql-relay';

import UserType from './User';
import { PostConnection } from './RelaySpecialized';
import { getAdmin } from '../models/User';

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'a client is abstracted as a viewer',
  fields: () => ({
    login: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'whether a the viewer login',
    },
    user: {
      type: UserType,
      description: 'the logged viewer',
      async resolve() {
        return getAdmin();
      },
    },
    timezone: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'the tz used to render the page',
      async resolve() {
        const admin = await getAdmin();
        return admin.timezone;
      },
    },
    posts: {
      type: new GraphQLNonNull(PostConnection),
      args: connectionArgs,
      description: 'the posts which the viewer can browse',
    },
  }),
});

export default viewerType;
