/**
 * Created by peterf on 2016/12/15.
 */
import { CommentModel } from '../data/models';

export function getCommentById(id) {
  return CommentModel
    .findById(id)
    .exec();
}
export function addComment() {
  throw new Error('not implemented');
}
