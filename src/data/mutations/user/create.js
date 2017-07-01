// @flow

import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';
import { UserType } from '../../types';
import { createUser } from '../../models/User';

const mutation = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    name: { type: new NonNull(StringType) },
    githubId: { type: new NonNull(StringType) },
    timezone: { type: new NonNull(IntType) },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: user => user,
    },
  },
  mutateAndGetPayload: ({ name, githubId, timezone }) => createUser({ name, githubId, timezone }),
});

export default mutation;
