// @flow

import { readUser } from './User';
import { readPost } from './Post';

export async function getObjectFromTypeAndId(
  type: string,
  id: string,
) {
  switch (type) {
    case 'User':
      return readUser({ id });
    case 'Post':
      return readPost({ id });
    default:
      return null;
  }
}

export async function setObjectById(
  object: any,
  id: string,
) {
  return new Promise((resolve) => {
    resolve(object, id); // fixme to add the data mutation logic
  });
}

export function virtualMeta() {
  return { created: this.created, updated: this.updated };
}
