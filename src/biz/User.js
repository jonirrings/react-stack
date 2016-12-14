/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { User } from '../data/models';
import { Github } from '../data/models/OAuth';
import extendId from './util/extendId';

export function create({ github, name, avatar }) {
  const user = new User({ github, name, avatar }).save();
  if (user) {
    return extendId(user);
  }
  return user;
}
export function retrieve({ github }) {
  return User.findOne({ github }).exec();
}
export async function findUserById(id) {
  const user = await User.findById(id).exec();
  if (user) {
    return extendId(user);
  }
  return user;
}
export function findOrCreate({ github, name, avatar }) {
  return retrieve({ github })
    .then((e) => {
      if (e) {
        return e;
      }
      return create({ github, name, avatar });
    })
    .then(extendId);
}
export function findOne() {
  return User.findOne().exec();
}

export function signInGithubUser({ loginName, loginId, avatarUrl, nickName, accessToken }) {
  return Github.findOne({ loginId }).exec().then((github) => {
    if (!github) {
      const user = new User({ name: nickName || loginName, avatar: avatarUrl });
      const newGitHub = new Github(
        { loginName, loginId, avatarUrl, nickName, accessToken, user: user.id },
        );
      user.set('github', github.id);
      user.save();
      newGitHub.save();
      return user;
    }
    github.update({ nickName, accessToken }).exec();
    return github.populate('user').execPopulate().then(g => g.user);
  });
}
