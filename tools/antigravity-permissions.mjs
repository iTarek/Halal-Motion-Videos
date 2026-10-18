// Opt-in setup for headless Antigravity. Preserve existing settings and all deny/ask rules.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const VIDEO_PERMISSION_RULES = [
  ...['typecheck', 'stills', 'review', 'shot', 'sfx', 'voice', 'copy-asset', 'appstore']
    .map(script => `command(npm run ${script})`),
  'command(regex:node --version)',
];

export function configurePermissions(settingsFile = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'settings.json')) {
  const exists = fs.existsSync(settingsFile);
  const original = exists ? fs.readFileSync(settingsFile, 'utf8') : null;
  const settings = original === null ? {} : JSON.parse(original);
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) throw new Error('Antigravity settings must be a JSON object.');
  if (settings.permissions !== undefined && (!settings.permissions || typeof settings.permissions !== 'object' || Array.isArray(settings.permissions)))
    throw new Error('Antigravity permissions must be a JSON object.');
  const permissions = settings.permissions ?? {};
  if (permissions.allow !== undefined && !Array.isArray(permissions.allow)) throw new Error('permissions.allow must be an array.');
  const allow = permissions.allow ?? [];
  const added = VIDEO_PERMISSION_RULES.filter(rule => !allow.includes(rule));
  if (!added.length) return { added: 0, settingsFile };
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  // Keep a private backup alongside the original; never print its contents.
  const backup = `${settingsFile}.halal-motion-backup`;
  if (original !== null && !fs.existsSync(backup)) fs.writeFileSync(backup, original, { flag: 'wx', mode: 0o600 });
  settings.permissions = { ...permissions, allow: [...allow, ...added] };
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2) + '\n', { mode: 0o600 });
  return { added: added.length, settingsFile };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const result = configurePermissions();
    console.log(`Antigravity: added ${result.added} video command rules. Existing deny/ask rules are unchanged.`);
    console.log('These CLI allow rules apply globally. They exclude renders, git and arbitrary shell commands.');
  } catch (error) {
    console.error(`Could not configure Antigravity permissions: ${error.message}`);
    process.exitCode = 1;
  }
}
