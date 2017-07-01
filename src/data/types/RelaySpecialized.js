// @flow
import {
  connectionDefinitions,
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';
import UserType from './User';
import PostType from './Post';
import CommentType from './Comment';
import { getObjectFromTypeAndId } from '../models/apiHelper';

const idFetcher: (id: string) => any = (globalId) => {
  const { type, id } = fromGlobalId(globalId);
  return getObjectFromTypeAndId(type, id);
};
const typeResolver = ({ type }: {type: string}) => {
  switch (type) {
    case 'User':
      return UserType;
    case 'Post':
      return PostType;
    case 'Comment':
      return CommentType;
    default:
      return null;
  }
};

const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

const { connectionType: PostConnection, edgeType: PostEdge } = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

const { connectionType: CommentConnection, edgeType: CommentEdge } = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});


export {
  nodeInterface,
  nodeField,
  UserConnection,
  UserEdge,
  PostConnection,
  PostEdge,
  CommentConnection,
  CommentEdge,
};
