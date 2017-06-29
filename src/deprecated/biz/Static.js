/**
 * Created by peterf on 2016/12/15.
 */
import { StaticModel } from '../data/models';

export function getStaticById(id) {
  return StaticModel
    .findById(id)
    .exec();
}

export function addOne() {
  throw new Error('not implemented');
}
