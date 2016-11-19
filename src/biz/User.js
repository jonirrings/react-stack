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

export function signInGithubUser({ login_name, login_id, avatar_url, nick_name, access_token }) {
  Github.findOne({ login_id }).exec().next((github) => {
    if (!github) {
      const user = new User({ name: login_name, avatar: avatar_url });
      const newGithub = new Github(
        { login_name, login_id, avatar_url, nick_name, access_token, user: user.id }
        );
      user.github = newGithub.id;
      user.save();
      return github.save();
    }
    github.set('nick_name', nick_name);
    github.set('access_token', access_token);
    return github.save();
  });
}
