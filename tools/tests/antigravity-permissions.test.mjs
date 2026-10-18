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
