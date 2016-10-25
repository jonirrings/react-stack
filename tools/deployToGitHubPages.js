/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import GitRepo from 'git-repository';
import run from './run';
import build from './build';

const remote = {
  name: 'github',
  url: 'https://github.com/{user}/{repo}.git',
  branch: 'gh-pages',
};

async function deployToGitHubPages() {
  const repo = await GitRepo.open('build/public', { init: true });
  await repo.setRemote(remote.name, remote.url);
  const isRefExists = await repo.hasRef(remote.url, remote.branch);
  if (isRefExists) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/${remote.branch}`, { hard: true });
    await repo.clean({ force: true });
  }
  process.argv.push('--static', '--release');
  await run(build);
  await repo.add('--all .');
  await repo.commit(`Update ${new Date().toISOString()}`);
  await repo.push(remote.name, `master:${remote.branch}`);
}

export default deployToGitHubPages;
