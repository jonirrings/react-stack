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
    clientID: '818a6417db7f905b549e',
    clientSecret: 'c99dbc8dd2b0124775396337b16e106e9358e34b',
  },
};
