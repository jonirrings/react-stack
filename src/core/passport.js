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
import { toGlobalId } from 'graphql-relay';
import { auth as config } from './config';
import { UserModel } from '../data/models';
import { Github } from '../data/models/OAuth';

const { github: { clientID, clientSecret, callbackURL } } = config;
passport.serializeUser((user, done) => {
  const sessionUser = { id: toGlobalId('User', user.id), name: user.name };
  done(null, sessionUser);
});

passport.deserializeUser((sessionUser, done) => {
  done(null, sessionUser);
});
passport.use(new GitHubStrategy({
  clientID,
  clientSecret,
  callbackURL,
},
  (accessToken, refreshToken, profile, done) => {
    const { _json: { login: loginName, id: loginId, avatar_url: avatarUrl, name: nickName } }
    = profile;
    Github.findOne({ loginId }, (err, github) => {
      if (err) { return done(err, github); }
      if (github) {
        return github.populate('user', (githubErr, { user }) => done(null, user));
      }
      const user = new UserModel({ name: nickName || loginName, avatar: avatarUrl });
      new Github({ loginName, loginId, avatarUrl, nickName, accessToken, user: user.id })
        .save((githubErr, savedGithub) => {
          user.set('github', savedGithub.id);
        });
      return user.save((userErr, savedUser) => {
        if (err) {
          return done(err, savedUser);
        }
        return done(null, savedUser);
      });
    });
  },
));

export default passport;
