/**
 * Created by JonirRings on 2016/12/4.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as IDType,
} from 'graphql';
import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { PostConnection, CaptchaType } from './';
import { Post, Captcha } from '../models';

const ViewerType = new ObjectType({
  name: 'Viewer',
  description: 'Any client is abstracted as a viewer',
  fields: () => ({
    id: {
      type: IDType,
      description: ' the id of a user in DB',
    },
    name: {
      type: StringType,
      description: 'a user\'s nickname from social networks',
    },
    posts: {
      type: PostConnection,
      description: 'the posts the viewer can see',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(Post.find(), args),
      //TODO make the filter method for viewer
    },
    captcha: {
      type: CaptchaType,
      description: 'the captcha for current viewer',
      resolve: (root, args, { user }) => Captcha.findOne({ userId: user.id }),
    },
  }),
});

export default ViewerType;
