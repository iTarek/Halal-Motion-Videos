// Agent first (CLAUDE.md): agents learn the CLI from the Agent Skill (SKILL.md and references/commands.md), so
// everything the CLI offers must be in it. These tests read the real CLI — its commands, its flags, the fields
// `status --json` returns — and fail when the skill misses one, or when the CLI and the dashboard disagree on AGENT_API.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const read = rel => fs.readFileSync(fileURLToPath(new URL(`../../${rel}`, import.meta.url)), 'utf8');
const cli = read('tools/video.mjs');
const reference = read('.agents/skills/halal-motion-videos/references/commands.md');
const skill = read('.agents/skills/halal-motion-videos/SKILL.md');
// The `status --json` section of the reference: its example and its field table (first column).
const statusDoc = reference.split(/^## `status --json`$/m)[1]?.split(/^## /m)[0] ?? '';
const exampleFields = Object.keys(JSON.parse(statusDoc.match(/```json\n([\s\S]*?)\n```/)?.[1] ?? '{}'));
const tableFields = statusDoc.split('\n').filter(l => l.startsWith('| `')).flatMap(l => [...l.split('|')[1].matchAll(/`([a-zA-Z0-9]+)`/g)].map(m => m[1]));

test('the CLI and the dashboard agree on AGENT_API', () => {
  const api = src => Number(src.match(/^const AGENT_API = (\d+);/m)?.[1]);
  assert.ok(api(cli) > 0);
  assert.equal(api(cli), api(read('tools/dashboard/server.mjs')));
});

test('the command reference lists every CLI command', () => {
  const commands = [...cli.matchAll(/^ {2}case "([a-z-]+)":/gm)].map(m => m[1]);
  assert.ok(commands.length > 5);
  const missing = commands.filter(c => !reference.includes(`| \`${c}`));
  assert.deepEqual(missing, [], `add these commands to references/commands.md: ${missing.join(', ')}`);
});

test('the skill explains every CLI flag', () => {
  const flags = [...new Set([...cli.matchAll(/flags(?:\.([a-zA-Z]+)|\["([a-z-]+)"\])/g)].map(m => m[1] ?? m[2]))];
  assert.ok(flags.length > 5);
  const missing = flags.filter(f => !reference.includes(`--${f}`) && !skill.includes(`--${f}`));
  assert.deepEqual(missing, [], `add these flags to SKILL.md (Settings) or references/commands.md: ${missing.map(f => `--${f}`).join(', ')}`);
});

test('the command reference explains every field of status --json', async t => {
  const server = http.createServer((req, res) => {
    const data = new URL(req.url, 'http://localhost').pathname === '/api/state'
      ? { agentApi: Number(cli.match(/^const AGENT_API = (\d+);/m)[1]), brands: [{ brand: 'demo', videos: [{ video: 'video01', outputs: { videos: [], stills: [] } }] }], jobs: [] }
      : { engine: 'claude', claude: { ok: true }, phase: 'build', running: true, step: 'Typechecking', messages: [], storyboard: [], styles: [], voice: { length: 10 }, autopilot: null };
    res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const proc = spawn(process.execPath, [fileURLToPath(new URL('../video.mjs', import.meta.url)), 'status', 'demo', 'video01', '--json'],
    { env: { ...process.env, PORT: String(server.address().port) }, windowsHide: true });
  let out = ''; proc.stdout.setEncoding('utf8'); proc.stdout.on('data', x => out += x);
  assert.equal(await new Promise(resolve => proc.on('close', resolve)), 0);
  const fields = Object.keys(JSON.parse(out));
  const unexplained = fields.filter(f => !tableFields.includes(f));
  assert.deepEqual(unexplained, [], `add a row for these status fields to the table in references/commands.md: ${unexplained.join(', ')}`);
  assert.deepEqual(exampleFields.sort(), [...fields].sort(), 'the status example in references/commands.md must have exactly the fields status --json returns');
});
