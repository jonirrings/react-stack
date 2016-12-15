/**
 * Created by peterf on 2016/12/15.
 */
import extend from 'extend';
import { CommentModel } from '../data/models';
import { CommentClass } from '../data/types';

export function getCommentById(id) {
  return CommentModel
    .findById(id)
    .exec()
    .then(user => extend(new CommentClass(), user.toObject()));
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
