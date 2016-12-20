/**
 * Created by peterf on 2016/12/15.
 */
import { PostModel } from '../data/models';

export function getPosts() {
  return PostModel
    .find()
    .exec();
}

export function getPostById(id) {
  return PostModel
    .findById(id)
    .exec();
}

export function addPost(args) {
  return new PostModel({ ...args }).save();
}
