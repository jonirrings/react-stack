/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import fetch from 'node-fetch';
import { writeFile, makeDir } from './lib/fs';
import runServer from './runServer';

// the paths your want to render as static
const routes = [
  '/',
  '/contact',
  '/login',
  '/register',
  '/about',
  '/privacy',
  '/404',
];

async function render() {
  const server = await runServer();
  await Promise.all(routes.map(async (route, index) => {
    const url = `http://${server.host}${route}`;
    const fileName = route.endsWith('/') ? 'index.html' : `${path.basename(route, '.html')}.html`;
    const dirName = path.join('build/public', route.endsWith('/') ? route : path.dirname(route));
    const dist = path.join(dirName, fileName);
    const timeStart = new Date();
    const response = await fetch(url);
    const timeEnd = new Date();
    const text = await response.text();
    await makeDir(dirName);
    await writeFile(dist, text);
    const time = timeEnd.getTime() - timeStart.getTime();
    console.log(`#${index + 1} ${dist} => ${response.status} ${response.statusText} (${time} ms)`);
  }));
  server.kill('SIGTERM');
}

export default render;
