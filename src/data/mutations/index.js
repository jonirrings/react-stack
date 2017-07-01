// @flow
import { GraphQLObjectType as ObjectType } from 'graphql';

import UserCreateMutation from './user/create';

import PostCreateMutation from './post/create';


const mutationType = new ObjectType({
  name: 'Mutation',
  description: 'mutation query',
  fields: {
    createUser: UserCreateMutation,
    createPost: PostCreateMutation,
  },
});
export default mutationType;
