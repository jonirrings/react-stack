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
import { findOrCreate } from '../biz/User';

const { github: { clientID, clientSecret } } = config;
passport.use(new GitHubStrategy({
  clientID,
  clientSecret,
  callbackURL: 'http://127.0.0.1:3000/login/github/callback',
},
  async (accessToken, refreshToken, profile, done) => {
    const {_json:{name,id:github,avatar_url:avatar}} = profile;
    const user = await findOrCreate({name, github, avatar});
    done(null, user);
  }
));

export default passport;
