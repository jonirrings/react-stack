import {
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

import { ViewerType, nodeField, BloggerType } from '../types';
import getBlogger from '../models/Blogger';
import getViewer from '../models/Viewer';

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
