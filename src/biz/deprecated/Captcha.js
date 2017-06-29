/**
 * Created by peterf on 2016/12/15.
 */
import { CaptchaModel } from '../data/models';

export function getCaptchaById(id) {
  return CaptchaModel
    .findById(id)
    .exec();
}
export function getCaptchaByUserId(id) {
  return CaptchaModel
    .findOne({ user: id })
    .exec();
}
