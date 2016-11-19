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
import { signInGithubUser } from '../biz/User';

const { github: { clientID, clientSecret } } = config;
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(new GitHubStrategy({
  clientID,
  clientSecret,
  callbackURL: 'http://127.0.0.1:3000/login/github/callback',
},
  async (accessToken, refreshToken, profile, done) => {
    const { _json: {
      login: loginName,
      id: loginId,
      avatar_url: avatarUrl,
      name: nickName,
    } } = profile;
    const user = await signInGithubUser({ loginName, loginId, avatarUrl, nickName, accessToken });
    done(null, { id: user.id, name: user.name });
  }
));

export default passport;
