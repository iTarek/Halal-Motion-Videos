import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { configurePermissions, VIDEO_PERMISSION_RULES } from '../antigravity-permissions.mjs';

test('permission setup preserves unrelated settings, deny/ask rules and a backup; repeated setup is a no-op', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-agy-permissions-'));
  t.after(() => {
    assert.ok(path.resolve(dir).startsWith(path.resolve(os.tmpdir()) + path.sep));
    fs.rmSync(dir, { recursive: true, force: true });
  });
  const file = path.join(dir, 'settings.json');
  const settings = { model: 'existing-model', custom: { value: 'preserve' }, permissions: { allow: ['command(existing)'], ask: ['mcp(*)'], deny: ['command(git)'] } };
  const original = JSON.stringify(settings);
  fs.writeFileSync(file, original);
  assert.equal(configurePermissions(file).added, VIDEO_PERMISSION_RULES.length);
  const saved = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.deepEqual(saved, { ...settings, permissions: { ...settings.permissions, allow: ['command(existing)', ...VIDEO_PERMISSION_RULES] } });
  assert.equal(fs.readFileSync(file + '.halal-motion-backup', 'utf8'), original);
  const before = fs.readFileSync(file, 'utf8');
  assert.equal(configurePermissions(file).added, 0);
  assert.equal(fs.readFileSync(file, 'utf8'), before);
  fs.writeFileSync(file, '{invalid');
  assert.throws(() => configurePermissions(file));
  assert.equal(fs.readFileSync(file, 'utf8'), '{invalid');
});

// The Director's tools are named in three places, which must agree: Claude's rules, Antigravity's, and CLAUDE.md, which
// tells every Director what it may run.
test('the three lists of tools the Director may run name the same ones', () => {
  const read = (rel) => fs.readFileSync(new URL(`../../${rel}`, import.meta.url), 'utf8');
  const sorted = (list) => [...new Set(list)].sort();
  const antigravity = sorted(VIDEO_PERMISSION_RULES.map((r) => r.match(/^command\(npm run ([\w-]+)\)$/)?.[1]).filter(Boolean));
  const allowed = read('tools/dashboard/director.mjs').match(/const ALLOWED_TOOLS = \[[\s\S]*?\n\];/)[0];
  const claude = sorted([...allowed.matchAll(/"Bash\(npm run ([\w-]+)[:)]/g)].map((m) => m[1]));
  const line = read('CLAUDE.md').split('\n').find((l) => l.includes('`npm run copy-asset`') && l.includes('`npm install`'));
  const guide = sorted([...line.split(';')[0].matchAll(/`(?:npm run )?([\w-]+)`/g)].map((m) => m[1]));
  assert.ok(claude.includes('look') && claude.length >= 9, String(claude));
  assert.deepEqual(antigravity, claude);
  assert.deepEqual(guide, claude);
});
