/**
 * Created by peterf on 2016/12/15.
 */
import extend from 'extend';
import { PostModel } from '../data/models';
import { PostClass } from '../data/types';


export function getPosts() {
  return PostModel
    .find()
    .exec();
}

export function getPostById(id) {
  return PostModel
    .findById(id)
    .exec()
    .then(user => extend(new PostClass(), user.toObject()));
}

export function getPostsByAuthorId(id) {
  return PostModel
    .find({ author: id })
    .exec();
}

export function addPost(args) {
  return new PostModel({ ...args }).save();
}
