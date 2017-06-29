// @flow
import { GraphQLSchema } from 'graphql';
import query from './queries';

const schema = new GraphQLSchema({ query });
export default schema;
