#!/usr/bin/env node
/**
 * Deploy bite.coach.
 *
 * There is no CI on this site: it only changes when someone runs a deploy, so
 * whatever folder was last deployed from IS the live site. On 2026-08-08 that
 * meant a checkout eighteen commits behind kept republishing an old homepage
 * over a newer one, and took the /pro checkout pages down with it, so Stripe
 * payers landed on a 404 after entering their card.
 *
 * The cause was not carelessness, it was shape: deploying the stale copy was
 * one command and deploying the current one needed extra flags. So this script
 * exists to make the correct deploy the easy one, and to refuse the wrong one:
 *
 *   1. Refuses to publish a tree behind origin/main, or one with uncommitted
 *      changes, unless --force says that is deliberate.
 *   2. Always builds fresh. A stale dist/ is what actually gets published, and
 *      it survives branch changes without complaint.
 *   3. Carries the site id, because .netlify/ is gitignored and a fresh clone
 *      otherwise hangs on an interactive link prompt.
 *   4. Verifies the pages that pay for the site are really live afterwards.
 */

import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';

const SITE_ID = 'a9967de7-f082-49c0-89d4-656f5be8463e';
/** Pages whose absence costs money or breaks a paid journey. */
const MUST_BE_LIVE = ['/', '/pro/', '/pro/success/', '/pro/cancel/', '/blog/'];
const SITE_URL = 'https://bite.coach';

const force = process.argv.includes('--force');
const run = (cmd, opts = {}) => execSync(cmd, { encoding: 'utf8', stdio: 'pipe', ...opts }).trim();
const say = (msg) => process.stdout.write(`${msg}\n`);
const die = (msg) => {
  process.stderr.write(`\n  ${msg}\n\n`);
  process.exit(1);
};

say('Checking the tree is worth publishing...');
run('git fetch origin --quiet');

const dirty = run('git status --porcelain');
if (dirty && !force) {
  die(
    `Uncommitted changes here, and dist/ would bake them in:\n${dirty}\n  ` +
      'Commit them, stash them, or pass --force if publishing them is the point.',
  );
}

const behind = Number(run('git rev-list --count HEAD..origin/main'));
if (behind > 0 && !force) {
  const missing = run('git log --oneline HEAD..origin/main');
  die(
    `This tree is ${behind} commit(s) behind origin/main. Publishing it would REVERT the live site.\n\n` +
      `${missing}\n\n  Run: git merge --ff-only origin/main   (or pass --force if you mean it)`,
  );
}

const ahead = Number(run('git rev-list --count origin/main..HEAD'));
if (ahead > 0) {
  say(`  note: ${ahead} commit(s) here are not on origin/main yet. Publishing them anyway.`);
}

say('Building fresh...');
if (existsSync('dist')) rmSync('dist', { recursive: true, force: true });
run('npm run build', { stdio: 'inherit' });

say('Deploying...');
run(`netlify deploy --prod --dir dist --site ${SITE_ID}`, { stdio: 'inherit' });

say('\nVerifying the pages that matter...');
let failed = 0;
for (const path of MUST_BE_LIVE) {
  const code = run(`curl -s -o /dev/null -w "%{http_code}" --max-time 25 "${SITE_URL}${path}"`);
  const ok = code === '200';
  if (!ok) failed += 1;
  say(`  ${ok ? 'ok  ' : 'FAIL'} ${path} -> ${code}`);
}

if (failed > 0) {
  die(`${failed} page(s) are not live. The deploy went out but the site is not right.`);
}
say('\nAll good.');
