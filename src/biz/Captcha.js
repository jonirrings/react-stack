/**
 * Created by peterf on 2016/12/15.
 */
import extend from 'extend';
import { CaptchaModel } from '../data/models';
import { CaptchaClass } from '../data/types';

export function getCaptchaById(id) {
  return CaptchaModel
    .findById(id)
    .exec()
    .then(user => extend(new CaptchaClass(), user.toObject()));
}
export function getCaptchaByUserId(id) {
  return CaptchaModel
    .findOne({ user: id })
    .exec();
}
