/**
 * Created by peterf on 2016/12/15.
 */
import { CommentModel } from '../data/models';

export function getCommentById(id) {
  return CommentModel
    .findById(id)
    .exec();
}
export function getCommentsByAuthorId(id) {
  return CommentModel
    .find({ author: id })
    .exec();
}
export function getCommentsByPostId(id) {
  return CommentModel
    .find({ commentOn: id })
    .exec();
}
