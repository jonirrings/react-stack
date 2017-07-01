// @flow

import { readUser } from './User';
import { readPost } from './Post';

export async function getObjectFromTypeAndId(type: string,
  id: string) {
  let ret = null;
  switch (type) {
    case 'User':
      ret = await readUser({ id });
      break;
    case 'Post':
      ret = await readPost({ id });
      break;
    default:
      ret = {};
  }
  ret.type = type;
  return ret;
}

export function virtualMeta() {
  return { created: this.created, updated: this.updated };
}
