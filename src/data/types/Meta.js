/**
 * Created by jonirrings on 17/4/21.
 */

import {
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';
import DateType from './custom/Date';

const MetaType = new GraphQLObjectType({
  name: 'Meta',
  description: 'created and updated time',
  fields: {
    created: {
      type: new GraphQLNonNull(DateType),
      description: 'created time',
    },
    updated: {
      type: new GraphQLNonNull(DateType),
      description: 'updated time',
    },
  },
});

export default MetaType;
