import {
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';
import { ViewerType, nodeField, BloggerType } from '../types';

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'root query',
  fields: {
    viewer: {
      type: new GraphQLNonNull(ViewerType),
      description: 'the viewer\'s information',
    },
    blogger: {
      type: new GraphQLNonNull(BloggerType),
      description: 'the owner of this site',
    },
    node: nodeField,
  },
});

export default queryType;
