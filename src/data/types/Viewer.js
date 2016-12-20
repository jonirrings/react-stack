/**
 * Created by JonirRings on 2016/12/4.
 */

import { GraphQLObjectType as ObjectType } from 'graphql';
import { connectionArgs, connectionFromPromisedArray, fromGlobalId, globalIdField } from 'graphql-relay';
import { PostConnection, CaptchaType, UserType } from './';
import { getPosts } from '../../biz/Post';
import { getCaptchaByUserId } from '../../biz/Captcha';
import { getUserById } from '../../biz/User';

const ViewerType = new ObjectType({
  name: 'Viewer',
  description: 'Any client is abstracted as a viewer',
  fields: () => ({
    id: globalIdField('Viewer', id => id),
    user: {
      type: UserType,
      description: 'the logged user',
      resolve: (root, args, { user }) => (!user ? null : getUserById(fromGlobalId(user.id).id)),
    },
    posts: {
      type: PostConnection,
      description: 'the posts the viewer can see',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(getPosts(), args),
      //TODO make the filter method for viewer
    },
    captcha: {
      type: CaptchaType,
      description: 'the captcha for current viewer',
      resolve: (root, args, { user }) => getCaptchaByUserId(fromGlobalId(user.id).id),
    },
  }),
});

export default ViewerType;
