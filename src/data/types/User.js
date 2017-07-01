// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { nodeInterface } from './RelaySpecialized';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'a user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'user id',
      resolve: ({ id }) => toGlobalId('User', id),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'nickname for comment or post',
    },
    githubId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'bond github id', // todo: in fact, oauth2 uses token
    },
    timezone: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'the timezone of the user',
    },
  },
  interfaces: () => [nodeInterface],
});

export default UserType;
