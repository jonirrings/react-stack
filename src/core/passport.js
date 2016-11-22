/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { auth as config } from '../config';

import { User } from '../data/models';
import { Github } from '../data/models/OAuth';

const { github: { clientID, clientSecret } } = config;
passport.serializeUser((user, done) => {
  const sessionUser = { id: user.id, name: user.name };
  done(null, sessionUser);
});

passport.deserializeUser((sessionUser, done) => {
  done(null, sessionUser);
});
passport.use(new GitHubStrategy({
  clientID,
  clientSecret,
  callbackURL: 'http://127.0.0.1:3000/login/github/callback',
},
  (accessToken, refreshToken, profile, done) => {
    const { _json: { login: loginName, id: loginId, avatar_url: avatarUrl, name: nickName } }
    = profile;
    Github.findOne({ loginId }, (err, github) => {
      if (err) { return done(err, github); }
      if (github) {
        return github.populate('user', (githubErr, { user }) => done(null, user));
      }
      const user = new User({ name: nickName || loginName, avatar: avatarUrl });
      new Github({ loginName, loginId, avatarUrl, nickName, accessToken, user: user.id }).save();
      user.set('github', github.id);
      return user.save((userErr, savedUser) => {
        if (err) {
          return done(err, savedUser);
        }
        return done(null, savedUser);
      });
    });
  }
));

export default passport;
