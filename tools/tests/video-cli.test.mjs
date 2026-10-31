import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

// what this CLI expects of the dashboard: stand-in servers answer with it, so a bump never breaks them
const AGENT_API=Number(readFileSync(new URL('../video.mjs',import.meta.url),'utf8').match(/^const AGENT_API = (\d+);/m)[1]);

for (const engine of ['codex','antigravity','claude']) test(`make selects ${engine} without requiring another engine`,async t=>{
  let selected=engine, started=false;
  const server=http.createServer(async(req,res)=>{
    let raw=''; for await(const c of req) raw+=c;
    const body=raw?JSON.parse(raw):{};
    const url=new URL(req.url,'http://localhost');
    let data;
    if(url.pathname==='/api/state') data={agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[]}}]}],jobs:[]};
    else if(url.pathname==='/api/director/engine'){selected=body.engine;data={ok:true};}
    else if(url.pathname==='/api/director/autopilot'){started=true;data={ok:true};}
    else if(url.pathname==='/api/director') data={engine:selected,claude:{ok:engine==='claude',fix:'not installed'},codex:{ok:engine==='codex'},antigravity:{ok:engine==='antigravity'},phase:'brief',messages:[],storyboard:[],styles:[],voice:{length:10},autopilot:started?{status:'running'}:null};
    else {res.statusCode=404;data={error:url.pathname};}
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const proc=spawn(process.execPath,[fileURLToPath(new URL('../video.mjs',import.meta.url)),'make','demo','video01','Test',`--engine=${engine}`,'--json'],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
  let out='',err='';proc.stdout.setEncoding('utf8');proc.stderr.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);proc.stderr.on('data',x=>err+=x);
  const code=await new Promise(resolve=>proc.on('close',resolve));
  assert.equal(code,0,err+out);assert.equal(started,true);assert.equal(JSON.parse(out).engine,engine);
});

// The Safe area switch, from an agent: `set --safe-area=on|off` reaches the dashboard and shows in status.settings.
test('an agent switches the safe area off and on, and sees it in status',async t=>{
  let safeArea=true;const sent=[];
  const server=http.createServer(async(req,res)=>{
    let raw='';for await(const c of req) raw+=c;
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/api/director/voiceover'){const b=JSON.parse(raw);sent.push(b.safeArea);safeArea=b.safeArea;}
    const data=url.pathname==='/api/state'
      ? {agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[],stills:[]}}]}],jobs:[]}
      : {ok:true,engine:'claude',claude:{ok:true},phase:'brief',running:false,messages:[],storyboard:[],styles:[],voice:{length:10,safeArea},autopilot:null};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const run=async(...args)=>{
    const proc=spawn(process.execPath,[fileURLToPath(new URL('../video.mjs',import.meta.url)),...args,'--json'],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
    let out='',err='';proc.stdout.setEncoding('utf8');proc.stderr.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);proc.stderr.on('data',x=>err+=x);
    return {code:await new Promise(resolve=>proc.on('close',resolve)),out,err};
  };
  const off=await run('set','demo','video01','--safe-area=off');
  assert.equal(off.code,0,off.err);assert.equal(JSON.parse(off.out).settings.safeArea,false);
  const on=await run('set','demo','video01','--safe-area=on');
  assert.equal(JSON.parse(on.out).settings.safeArea,true);
  assert.deepEqual(sent,[false,true]);
  const bad=await run('set','demo','video01','--safe-area=maybe');
  assert.notEqual(bad.code,0);assert.match(bad.out+bad.err,/--safe-area is on or off/);
  const typo=await run('set','demo','video01','--voiceover=yes'); // a typo isn't "off"
  assert.notEqual(typo.code,0);assert.match(typo.out+typo.err,/--voiceover is on or off/);
  assert.equal(sent.length,2); // nothing sent for a bad value
});

// Agent first: everything a finished video comes with reaches an agent through `status` (CLAUDE.md → Agent first).
test('status hands an agent the MP4s, the caption and the cover images',async t=>{
  const server=http.createServer((req,res)=>{
    const url=new URL(req.url,'http://localhost');
    const stills=[{name:'demo-video01-vertical-poster.jpg',rel:'stills/demo-video01-vertical-poster.jpg'},{name:'vertical-030.jpg',rel:'stills/vertical-030.jpg'}];
    const data=url.pathname==='/api/state'
      ? {agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',share:'Caption.',outputs:{videos:[{name:'demo-video01-vertical.mp4',rel:'demo-video01-vertical.mp4'}],stills}}]}],
         jobs:[{id:1,brand:'demo',video:'video01',label:'Render vertical',status:'done',progress:100,log:['saved out/demo/video01/demo-video01-vertical.mp4']}]}
      : {engine:'claude',claude:{ok:true},phase:'build',messages:[],storyboard:[],styles:[],voice:{length:10},autopilot:null};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const run=async(...args)=>{
    const proc=spawn(process.execPath,[fileURLToPath(new URL('../video.mjs',import.meta.url)),'status','demo','video01',...args],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
    let out='';proc.stdout.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);
    assert.equal(await new Promise(resolve=>proc.on('close',resolve)),0);return out;
  };
  const st=JSON.parse(await run('--json'));
  assert.match(st.share,/src[\\/]brands[\\/]demo[\\/]video01[\\/]SHARE\.md$/);
  assert.equal(st.posters.length,1);assert.match(st.posters[0],/demo-video01-vertical-poster\.jpg$/);
  assert.match(st.mp4[0],/demo-video01-vertical\.mp4$/);
  const text=(await run()).trim().split('\n');
  assert.ok(text.some(l=>l.startsWith('Caption: '))&&text.some(l=>l==='Posters:'));
  assert.match(text.at(-1),/^MP4: .*demo-video01-vertical\.mp4$/); // last, so `tail -1` still finds it
});

// Gemini voice-over, from an agent: the key goes in on stdin (never the command line), the provider and voice as flags,
// and status says who narrates.
test('an agent sets up Gemini voice-over and sees who narrates in status',async t=>{
  const sent=[];let provider='elevenlabs';
  const server=http.createServer(async(req,res)=>{
    let raw='';for await(const c of req) raw+=c;
    const url=new URL(req.url,'http://localhost');
    let data;
    if(url.pathname==='/api/settings'){
      if(raw){const b=JSON.parse(raw);sent.push(b);if(b.voiceProvider) provider=b.voiceProvider;}
      data={elevenlabs:{hasKey:true,keyHint:'…abcd',voiceId:'NOpBlnGInO9m6vDvFkFC',voiceName:'',model:'eleven_v4'},
        gemini:{hasKey:sent.some(b=>b.geminiKey),keyHint:'…wxyz',voice:'Puck',voices:['Kore','Puck'],model:'gemini-3.8-flash-tts',models:{}},voiceProvider:provider,provider};
    } else if(url.pathname==='/api/state') data={agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[],stills:[]}}]}],jobs:[]};
    else data={ok:true,engine:'claude',claude:{ok:true},phase:'brief',running:false,messages:[],storyboard:[],styles:[],voice:{length:10,provider,enabled:true},autopilot:null};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const run=async(args,input='')=>{
    const proc=spawn(process.execPath,[fileURLToPath(new URL('../video.mjs',import.meta.url)),...args,'--json'],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
    let out='',err='';proc.stdout.setEncoding('utf8');proc.stderr.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);proc.stderr.on('data',x=>err+=x);
    proc.stdin.end(input);
    return {code:await new Promise(resolve=>proc.on('close',resolve)),out,err};
  };
  const key=await run(['voice-settings','--gemini-key-stdin'],'AIza-test-key\n');
  assert.equal(key.code,0,key.err+key.out);assert.deepEqual(sent[0],{geminiKey:'AIza-test-key'});
  const pick=await run(['voice-settings','--provider=gemini','--gemini-voice=Puck']);
  assert.equal(pick.code,0,pick.err);assert.deepEqual(sent[1],{voiceProvider:'gemini',geminiVoice:'Puck'});
  assert.equal(JSON.parse(pick.out).provider,'gemini');assert.equal(JSON.parse(pick.out).gemini.voice,'Puck');
  const bad=await run(['voice-settings','--provider=google']);
  assert.notEqual(bad.code,0);assert.match(bad.out+bad.err,/--provider is elevenlabs or gemini/);assert.equal(sent.length,2); // nothing sent
  const st=await run(['status','demo','video01']);
  assert.equal(st.code,0,st.err);assert.equal(JSON.parse(st.out).settings.voiceProvider,'gemini');
});
