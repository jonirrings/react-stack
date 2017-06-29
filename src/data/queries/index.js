import {
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

import { ViewerType, nodeField, BloggerType } from '../types';
import getBlogger from '../models/BloggerModel';
import getViewer from '../models/ViewerModel';

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'root query',
  fields: {
    viewer: {
      type: new GraphQLNonNull(ViewerType),
      description: 'the viewer\'s information',
      resolve: getViewer,
    },
    blogger: {
      type: new GraphQLNonNull(BloggerType),
      description: 'the owner of this site',
      resolve: getBlogger,
    },
    node: nodeField,
  },
});

export default queryType;
