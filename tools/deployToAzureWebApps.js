/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import GitRepo from 'git-repository';
import fetch from 'node-fetch';
import run from './run';
import build from './build';

function getRemote(slot) {
  return {
    name: slot || 'production',
    url: `https://example${slot ? `-${slot}` : ''}.scm.azurewebsites.net:443/example.git`,
    branch: 'master',
    website: `http://example${slot ? `-${slot}` : ''}.azurewebsites.net`,
  };
}
async function deployToAzureWebApps() {
  const remote = getRemote(process.argv.includes('--production') ? null : 'staging');
  const repo = await GitRepo.open('build', { init: true });
  await repo.setRemote(remote.name, remote.url);
  const isRefExists = await repo.hasRef(remote.url, remote.branch);
  if (isRefExists) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/${remote.branch}`, { hard: true });
    await repo.clean({ force: true });
  }
  process.argv.push('--release');
  await run(build);
  await repo.add('--all .');
  await repo.commit(`Update ${new Date().toISOString()}`);
  await repo.push(remote.name, `master:${remote.branch}`);
  const response = await fetch(remote.website);
  console.log(`${remote.website} -> ${response.status}`);
}

export default deployToAzureWebApps;
