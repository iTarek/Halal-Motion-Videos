import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { createDirector } from '../dashboard/director.mjs';

function fixture(t, engine) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-director-'));
  t.after(() => {
    assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir()) + path.sep));
    fs.rmSync(root, {recursive:true,force:true});
  });
  fs.mkdirSync(path.join(root,'src/brands/demo/video01'),{recursive:true});
  fs.writeFileSync(path.join(root,'src/brands/demo/video01/index.ts'), 'export const formats = ["vertical", "horizontal"];');
  const calls=[];
  const spawnProcess=(bin,args,options)=>{
    const p=new EventEmitter(); p.stdin=new PassThrough();p.stdout=new PassThrough();p.stderr=new PassThrough();p.kill=()=>{};
    calls.push({bin,args,options,p});return p;
  };
  const director=createDirector({root,brandsDir:path.join(root,'src/brands'),onBuilt:()=>{},spawnProcess});
  director.setEngine('demo','video01',engine);
  return {director,calls,root};
}
const event=(p,e)=>p.stdout.write(JSON.stringify(e)+'\n');

test('Codex startup permissions show actionable guidance and keep an existing session',t=>{
  const {director,calls}=fixture(t,'codex');
  director.send('demo','video01','Hello');
  event(calls[0].p,{type:'thread.started',thread_id:'existing'});
  calls[0].p.emit('close',0);
  director.send('demo','video01','Continue');
  calls[1].p.stderr.write('WARNING: Access is denied. (os error 5) at tmp/arg0/codex-temp\n' + 'warning\n'.repeat(400) + 'Error: failed to open memories DB');
  calls[1].p.emit('close',1);
  const s=director.state('demo','video01');
  assert.equal(s.hasSession,true);
  assert.ok(s.messages.some(m=>m.text.includes('Start.bat') && m.text.includes('Error: failed to open memories DB')));
});

test('Codex exit diagnostics retain the final failure after startup warnings',t=>{
  const {director,calls}=fixture(t,'codex');
  director.send('demo','video01','Hello');
  calls[0].p.stderr.write('startup warning\n'.repeat(400)+'Error: connection failed');
  calls[0].p.emit('close',1);
  assert.ok(director.state('demo','video01').messages.some(m=>m.text.includes('Error: connection failed')));
});

test('Codex events preserve session, reply and failure after startup',t=>{
  const {director,calls}=fixture(t,'codex');
  director.send('demo','video01','Write the brief');
  const p=calls[0].p;
  event(p,{type:'thread.started',thread_id:'codex-session'});
  event(p,{type:'item.completed',item:{type:'agent_message',text:'Ready'}});
  event(p,{type:'turn.failed',error:{message:'Network failure'}});
  p.emit('close',1);
  const s=director.state('demo','video01');
  assert.equal(s.running,false);assert.equal(s.hasSession,true);
  assert.ok(s.messages.some(m=>m.text==='Ready'));
  assert.ok(s.messages.some(m=>m.text.includes('Network failure')));
  director.send('demo','video01','Retry');
  assert.ok(calls[1].args.includes('codex-session'));
  calls[1].p.emit('close',0);
});

test('Antigravity parses fragmented events and final result without newline, resumes its own conversation',t=>{
  const {director,calls}=fixture(t,'antigravity');
  director.send('demo','video01','اكتب الموجز');
  assert.ok(calls[0].args.includes('--dangerously-skip-permissions'));
  const p=calls[0].p;
  const init=JSON.stringify({event:'init',conversation_id:'agy-session'})+'\n';
  p.stdout.write(init.slice(0,11));p.stdout.write(init.slice(11));
  event(p,{event:'step_update',step_update:{step_type:'tool',state:'ACTIVE',tool_name:'write_to_file'}});
  p.stdout.write(JSON.stringify({event:'result',result:{conversation_id:'agy-session',status:'SUCCESS',response:'الموجز جاهز'}}));
  p.emit('close',0);
  const s=director.state('demo','video01');
  assert.equal(s.running,false);assert.equal(s.model,'Antigravity');
  assert.ok(s.messages.some(m=>m.text==='الموجز جاهز'));
  assert.ok(s.messages.some(m=>m.role==='meta'));
  director.send('demo','video01','Continue');
  assert.ok(calls[1].args.includes('--conversation'));
  assert.ok(calls[1].args.includes('agy-session'));
  assert.ok(calls[1].args.includes('--dangerously-skip-permissions'));
  calls[1].p.emit('close',0);
});

test('Antigravity error status does not count as success even when process exits zero',t=>{
  const {director,calls}=fixture(t,'antigravity');
  director.send('demo','video01','Build');
  event(calls[0].p,{event:'result',result:{status:'ERROR',error:'authentication required'}});
  calls[0].p.emit('close',0);
  const s=director.state('demo','video01');
  assert.ok(s.messages.some(m=>m.text.includes('authentication required')));
  assert.ok(!s.messages.some(m=>m.role==='meta'));
});

test('Antigravity permission denial with SUCCESS and empty response is a failure with a fix',t=>{
  const {director,calls}=fixture(t,'antigravity');
  director.send('demo','video01','Build');
  const p=calls[0].p;
  event(p,{event:'step_update',step_update:{step_type:'tool',state:'ERROR',tool_info:{parameters:{CommandLine:'dir src\\brands\\demo'},error:{message:'permission check failed'}}}});
  event(p,{event:'result',result:{status:'SUCCESS',response:'',denied_actions:[{action:'command',display_name:'RunCommand'}]}});
  p.emit('close',0);
  const s=director.state('demo','video01');
  assert.ok(s.messages.some(m=>m.role==='system' && m.text.includes('RunCommand') && m.text.includes('Restart the dashboard')));
  assert.ok(s.messages.some(m=>m.role==='system' && m.text.includes('Command: dir src\\brands\\demo')));
  assert.ok(!s.messages.some(m=>m.role==='meta'));
});

test('Antigravity empty success keeps the tool failure visible',t=>{
  const {director,calls}=fixture(t,'antigravity');
  director.send('demo','video01','Build');
  event(calls[0].p,{event:'step_update',step_update:{step_type:'tool',state:'ERROR',tool_info:{error:{message:'command failed: missing dependency'}}}});
  event(calls[0].p,{event:'result',result:{status:'SUCCESS',response:''}});
  calls[0].p.emit('close',0);
  const s=director.state('demo','video01');
  assert.ok(s.messages.some(m=>m.role==='system' && m.text.includes('missing dependency')));
  assert.ok(!s.messages.some(m=>m.role==='meta'));
});

test('Antigravity streamed response is retained when the result omits it',t=>{
  const {director,calls}=fixture(t,'antigravity');
  director.send('demo','video01','Hello');
  event(calls[0].p,{event:'step_update',step_update:{step_type:'agent_response',state:'ACTIVE',text_delta:'الموجز '}});
  event(calls[0].p,{event:'step_update',step_update:{step_type:'agent_response',state:'DONE',text_delta:'جاهز'}});
  event(calls[0].p,{event:'result',result:{status:'SUCCESS',response:''}});
  calls[0].p.emit('close',0);
  const s=director.state('demo','video01');
  assert.equal(s.messages.filter(m=>m.role==='claude').length,1);
  assert.ok(s.messages.some(m=>m.text==='الموجز جاهز'));
  assert.ok(s.messages.some(m=>m.role==='meta'));
});

test('Engine switch rejects active run and does not reuse another engine session',t=>{
  const {director,calls}=fixture(t,'codex');
  director.send('demo','video01','Hello');
  assert.throws(()=>director.setEngine('demo','video01','antigravity'),/Stop/);
  event(calls[0].p,{type:'thread.started',thread_id:'codex-session'});
  calls[0].p.emit('close',0);
  director.setEngine('demo','video01','antigravity');
  director.send('demo','video01','Hello');
  assert.ok(!calls[1].args.includes('--conversation'));
  calls[1].p.emit('close',0);
});

test('New chat preserves selected engine and clears its session',t=>{
  const {director,calls}=fixture(t,'antigravity');
  director.send('demo','video01','Hello');
  event(calls[0].p,{event:'init',conversation_id:'agy-session'});
  calls[0].p.emit('close',0);
  director.reset('demo','video01');
  const s=director.state('demo','video01');
  assert.equal(s.engine,'antigravity');assert.equal(s.hasSession,false);assert.deepEqual(s.messages,[]);
});
