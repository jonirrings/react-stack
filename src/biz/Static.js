/**
 * Created by peterf on 2016/12/15.
 */
import extend from 'extend';
import { StaticModel } from '../data/models';
import { StaticClass } from '../data/types';

export function getStaticById(id) {
  return StaticModel
    .findById(id)
    .exec()
    .then(user => extend(new StaticClass(), user.toObject()));
}
