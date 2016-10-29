/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/blog';
export const auth = {
  jwt: { secret: process.env.JWT_SECRET || 'Jonir Rings\' Home' },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || 'Your Client ID',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'Your Client Secret',
  },
};
