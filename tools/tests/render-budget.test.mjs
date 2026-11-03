// What a render may use and how it ends: Chrome tabs by free memory, a limit on video frames, a plain message after a crash,
// and no process left open after Chrome was replaced mid-render (tools/chrome.mjs, tools/lib.mjs). Nothing here renders.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';
import { crashAdvice, renderBudget } from '../chrome.mjs';

const GB = 1024 ** 3;
const tool = (name) => fileURLToPath(new URL(`../${name}`, import.meta.url));

test('a render takes the Chrome tabs the free memory allows, up to 8 and never more than the cores', () => {
  const tabs = (cores, room) => renderBudget({ cores, room: room * GB }).tabs;
  assert.equal(tabs(16, 32), 8);
  assert.equal(tabs(2, 32), 2);
  assert.equal(tabs(8, 6), 5);
  assert.equal(tabs(8, 4), 3);
  assert.equal(tabs(8, 2), 1);
  assert.equal(tabs(8, 0), 1); // a container already over its limit still renders
});

test('video frames get a limit, and a smaller one when memory is short', () => {
  const cache = (room) => renderBudget({ cores: 8, room: room * GB }).videoCache;
  assert.equal(cache(32), GB);
  assert.equal(cache(2), GB / 2);
  assert.equal(cache(0), GB / 4);
});

test('asking for tabs overrides the memory, but not the cores, which Remotion would refuse', () => {
  assert.equal(renderBudget({ concurrency: 4, cores: 8, room: GB }).tabs, 4);
  assert.equal(renderBudget({ concurrency: 16, cores: 8, room: 32 * GB }).tabs, 8);
  assert.equal(renderBudget({ concurrency: 1, cores: 8, room: 32 * GB }).tabs, 1);
});

test('this machine gets a real answer', () => {
  const { tabs, videoCache } = renderBudget();
  assert.ok(Number.isInteger(tabs) && tabs >= 1 && tabs <= 8, String(tabs));
  assert.ok(Number.isInteger(videoCache) && videoCache >= GB / 4, String(videoCache));
});

// These messages are what real renders said when their Chrome and video helper were killed.
test('a crash gets a plain next step with half the tabs, keeping the rest of the command', () => {
  const args = ['my-app', 'video01', 'vertical', '--frames=0-89', '--concurrency=8'];
  for (const message of ['Protocol error (Runtime.callFunctionOn): Target closed. https://www.remotion.dev/docs/target-closed', 'Compositor exited with signal SIGKILL', 'Compositor quit with signal SIGKILL', 'Compositor exited with code 3221225477: ', 'Page crashed!', 'Session closed. Most likely the page has been closed.', 'Navigation failed because browser has disconnected!']) {
    const advice = crashAdvice(new Error(message), 8, args);
    assert.match(advice, /most likely out of memory with 8 tabs/, message);
    assert.ok(advice.endsWith('npm run render -- my-app video01 vertical --frames=0-89 --concurrency=4'), advice);
    assert.ok(advice.includes(message), advice);
  }
  assert.ok(crashAdvice(new Error('Target closed'), 3, ['a']).endsWith('--concurrency=1'));
});

test('with 1 tab there are no fewer to suggest, and only the first line of an error is repeated', () => {
  const advice = crashAdvice(new Error('Target closed\n  at some.js:1:1'), 1, ['a', 'b']);
  assert.match(advice, /even with 1 tab/);
  assert.doesNotMatch(advice, /--concurrency|some\.js/);
});

test('any other error is left alone, a video helper that failed by itself too: fewer tabs would not help', () => {
  for (const error of [new Error('No composition for x/y'), new Error('poster frame 900 is not in the film'), new Error('Compositor exited with code 127: error while loading shared libraries'), new Error('Compositor quit'), new Error('Compositor error: could not decode'), undefined]) assert.equal(crashAdvice(error, 4, []), null, error?.message);
});

test('render refuses a bad --concurrency before it bundles anything', () => {
  for (const flag of ['--concurrency=abc', '--concurrency=0', '--concurrency=1.5', '--concurrency']) {
    const r = spawnSync(process.execPath, [tool('render.mjs'), 'demo', flag], { encoding: 'utf8', windowsHide: true, timeout: 30000 });
    assert.equal(r.status, 1, flag);
    assert.match(r.stderr, /whole number of Chrome tabs/, flag);
  }
});

test('quit ends a process something else keeps open, with its code and its last words', () => {
  const lib = pathToFileURL(tool('lib.mjs')).href;
  const run = (args) => spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { quit } from ${JSON.stringify(lib)};
    setInterval(() => {}, 1000); // stands in for the Chrome Remotion left running
    console.log("saved");
    await quit(${args});`], { encoding: 'utf8', windowsHide: true, timeout: 30000 });
  const done = run('');
  assert.equal(done.status, 0, done.stderr);
  assert.equal(done.stdout, 'saved\n');
  assert.equal(run('1').status, 1);
});

test('every tool that renders whole films ends with quit', () => {
  for (const name of ['render.mjs', 'review.mjs']) assert.match(fs.readFileSync(tool(name), 'utf8'), /\nawait quit\(\);\r?\n$/, name);
});

test('a render job\'s label reads in Arabic, every part of it, and the video\'s name stays as it is', () => {
  const element = { addEventListener() {} };
  const page = {
    localStorage: { getItem: () => 'ar', setItem() {} }, navigator: { language: 'ar' }, NodeFilter: {},
    MutationObserver: class { observe() {} disconnect() {} },
    document: { documentElement: {}, body: {}, querySelector: () => element, querySelectorAll: () => [], createTreeWalker: () => ({ nextNode: () => false }) },
  };
  page.window = page;
  vm.runInNewContext(fs.readFileSync(tool('dashboard/i18n.js'), 'utf8'), page);
  const { translate } = page.dashboardI18n;
  assert.equal(translate('Render demo/video01 · all formats · frames 0-89 · film look · tabs 2'), 'تصدير demo/video01 · جميع الأبعاد · الإطارات 0-89 · مظهر سينمائي · تبويبات Chrome: 2');
  assert.equal(translate('Render demo/video01 · vertical'), 'تصدير demo/video01 · عمودي');
});
