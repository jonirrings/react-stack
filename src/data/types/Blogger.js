
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const bloggerType = new GraphQLObjectType({
  name: 'Blogger',
  description: 'The owner of this web',
  fields: () => ({
    resume: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the resume of blogger',
    },
    github: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the github of blogger',
    },
    weibo: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the sina weibo of blogger',
    },
    qq: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the tencent qq of blogger',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the email of blogger',
    },
  }),
});

export default bloggerType;
