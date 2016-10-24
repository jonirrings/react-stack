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
import { findOrCreate } from '../biz/User';
import { auth as config } from '../config';

const { github: { clientID, clientSecret } } = config;
passport.use(new GitHubStrategy({
  clientID,
  clientSecret,
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
},
  (accessToken, refreshToken, profile, done) => {
    findOrCreate({ ...profile }, (err, user) =>
      done(err, user)
    );
  }
));
