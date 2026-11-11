import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import fs, { readFileSync } from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';

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

// A palette is a file: `moves` works with no dashboard, and doesn't start one. On a temp copy, so no real video is touched.
test('an agent chooses and reads a palette through the CLI, with no server',t=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'hmv-cli-moves-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const tools=fileURLToPath(new URL('..',import.meta.url));
  fs.mkdirSync(path.join(root,'tools'));
  for(const f of ['video.mjs','moves.mjs','styles.mjs','settings.mjs']) fs.copyFileSync(path.join(tools,f),path.join(root,'tools',f));
  fs.mkdirSync(path.join(root,'src','brands','demo','video01'),{recursive:true});
  fs.writeFileSync(path.join(root,'src','brands','demo','video01','index.ts'),'');
  // a port nothing listens on: reaching for a server here would start one, and fail
  const run=(...args)=>spawnSync(process.execPath,[path.join(root,'tools','video.mjs'),'moves',...args],{encoding:'utf8',windowsHide:true,timeout:10000,env:{...process.env,PORT:'1'}});
  const made=run('demo','video01','--cues=number','--json');
  assert.equal(made.status,0,made.stderr);
  const plan=JSON.parse(made.stdout);
  assert.equal(plan.ok,true);
  assert.equal(plan.file,path.join(fs.realpathSync(root),'src','brands','demo','video01','moves.json'));
  assert.deepEqual(plan.accents.map(m=>m.cue),['number']);
  assert.deepEqual(JSON.parse(run('demo','video01','--json').stdout).core,plan.core); // shown again, unchanged
  assert.match(run('demo','video01').stdout,/Core: build the whole video/);
  assert.ok(JSON.parse(run('--list','--json').stdout).moves.length>50);
  assert.match(run().stderr,/Usage/); // no brand, no --list
  assert.ok(!fs.existsSync(path.join(root,'.director','dashboard.log')),'it started a server');
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
      ? {agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',share:'Caption.',moves:{family:'punch',style:{id:'paper-cut',name:'Paper cut',suggested:true},core:[{id:'riseUp',name:'Mask rise'}],accents:[{id:'counter',name:'Rolling counter'}]},outputs:{videos:[{name:'demo-video01-vertical.mp4',rel:'demo-video01-vertical.mp4'}],stills}}]}],
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
  assert.match(st.moves.file,/src[\\/]brands[\\/]demo[\\/]video01[\\/]moves\.json$/);
  assert.equal(st.facts,null);assert.equal(st.site,null); // no such files for this made-up brand
  assert.deepEqual([st.moves.family,st.moves.style,st.moves.core,st.moves.accents],['punch','Paper cut',['Mask rise'],['Rolling counter']]);
  assert.equal(st.posters.length,1);assert.match(st.posters[0],/demo-video01-vertical-poster\.jpg$/);
  assert.match(st.mp4[0],/demo-video01-vertical\.mp4$/);
  const text=(await run()).trim().split('\n');
  assert.ok(text.some(l=>l.startsWith('Caption: '))&&text.some(l=>l==='Posters:'));
  assert.match(text.at(-1),/^MP4: .*demo-video01-vertical\.mp4$/); // last, so `tail -1` still finds it
});

// facts.md and site.json are files, so status finds them on disk. On a temp copy of the CLI, so no real brand is touched.
test('status hands an agent the facts and what the website says',async t=>{
  const server=http.createServer((req,res)=>{
    const data=new URL(req.url,'http://localhost').pathname==='/api/state'
      ? {agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[],stills:[]}}]}],jobs:[]}
      : {engine:'claude',claude:{ok:true},phase:'brief',messages:[],storyboard:[],styles:[],voice:{length:10},autopilot:null};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'hmv-cli-facts-')));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  fs.mkdirSync(path.join(root,'tools'));
  fs.copyFileSync(fileURLToPath(new URL('../video.mjs',import.meta.url)),path.join(root,'tools','video.mjs'));
  const brand=path.join(root,'src','brands','demo');
  for(const d of ['brand','video01']) fs.mkdirSync(path.join(brand,d),{recursive:true});
  fs.writeFileSync(path.join(brand,'video01','facts.md'),'- 30 prayers: site.json\n');
  fs.writeFileSync(path.join(brand,'brand','site.json'),'{}');
  const status=async(...args)=>{
    const proc=spawn(process.execPath,[path.join(root,'tools','video.mjs'),'status','demo','video01',...args],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
    let out='';proc.stdout.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);
    assert.equal(await new Promise(resolve=>proc.on('close',resolve)),0);return out;
  };
  const st=JSON.parse(await status('--json'));
  assert.equal(st.facts,path.join(brand,'video01','facts.md'));
  assert.equal(st.site,path.join(brand,'brand','site.json'));
  const text=await status();
  assert.ok(text.includes(`Facts: ${st.facts}`)&&text.includes(`Website says: ${st.site}`),text);
  fs.writeFileSync(path.join(brand,'video01','site.json'),'{}'); // a video's own comes first
  assert.equal(JSON.parse(await status('--json')).site,path.join(brand,'video01','site.json'));
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

// Gemini picked but its key not saved: ElevenLabs still narrates, and the text output must say so.
test('voice-settings says who really narrates when Gemini is picked without its key',async t=>{
  const server=http.createServer((req,res)=>{
    const data=new URL(req.url,'http://localhost').pathname==='/api/state'?{agentApi:AGENT_API,brands:[],jobs:[]}
      :{elevenlabs:{hasKey:true,keyHint:'…abcd',voiceId:'NOpBlnGInO9m6vDvFkFC',voiceName:'',model:'eleven_v4'},
        gemini:{hasKey:false,keyHint:'',voice:'Sadachbia',model:'gemini-3.8-flash-tts'},voiceProvider:'gemini',provider:'elevenlabs'};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const proc=spawn(process.execPath,[fileURLToPath(new URL('../video.mjs',import.meta.url)),'voice-settings'],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
  let out='';proc.stdout.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);
  assert.equal(await new Promise(resolve=>proc.on('close',resolve)),0);
  assert.match(out,/^Gemini: key not set/m);assert.match(out,/^Voice-over by: elevenlabs$/m);
});

// The real dashboard server, run from a copy of tools/ in a temp folder: its own settings file, so no real key is read
// and nothing reaches ElevenLabs or Google (every case here stops before any remote check).
const realDashboard=async(t,{styles=false}={})=>{
  const repo=fileURLToPath(new URL('../../',import.meta.url));
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'hmv-server-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  fs.cpSync(path.join(repo,'tools'),path.join(root,'tools'),{recursive:true,filter:src=>!src.includes('__pycache__')});
  fs.symlinkSync(path.join(repo,'node_modules'),path.join(root,'node_modules'),'junction');
  if(styles) fs.cpSync(path.join(repo,'styles'),path.join(root,'styles'),{recursive:true,filter:src=>!src.endsWith('library.json')}); // the built-in ones, never the real library
  fs.mkdirSync(path.join(root,'src','brands','demo','video01'),{recursive:true});fs.writeFileSync(path.join(root,'src','brands','demo','video01','index.ts'),'');
  const port=await new Promise(resolve=>{const s=net.createServer().listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});
  const proc=spawn(process.execPath,[path.join(root,'tools','dashboard','server.mjs')],{env:{...process.env,PORT:String(port),ELEVENLABS_API_KEY:''},windowsHide:true});
  t.after(()=>proc.kill());
  let log='';proc.stdout.setEncoding('utf8');proc.stderr.setEncoding('utf8');proc.stderr.on('data',x=>log+=x);
  await new Promise((resolve,reject)=>{proc.stdout.on('data',x=>{log+=x;if(log.includes('dashboard →')) resolve();});proc.on('close',()=>reject(new Error(log)));});
  const post=async(p,body)=>{const r=await fetch(`http://127.0.0.1:${port}${p}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});return {status:r.status,text:await r.text()};};
  return {root,post,url:`http://127.0.0.1:${port}`};
};

test('the dashboard takes a Gemini voice per video, and refuses bad models, keys and providers before asking anyone',async t=>{
  const {root,post}=await realDashboard(t);
  const settings=(s)=>{fs.mkdirSync(path.join(root,'.director'),{recursive:true});fs.writeFileSync(path.join(root,'.director','settings.json'),JSON.stringify(s));};
  settings({gemini:{apiKey:'test-gemini-key'}}); // Gemini narrates
  const voice=(voiceId)=>post('/api/director/voiceover',{brand:'demo',video:'video01',voiceId});
  const saved=()=>JSON.parse(readFileSync(path.join(root,'.director','demo','video01.json'),'utf8')).voiceId;
  // Gemini in use: a 4-letter name passes, in its own case; an ElevenLabs ID doesn't
  let r=await voice('kore');assert.equal(r.status,200,r.text);assert.equal(saved(),'Kore');
  r=await voice('NOpBlnGInO9m6vDvFkFC');assert.equal(r.status,409);assert.match(r.text,/isn't a Gemini voice/);
  // ElevenLabs in use: the ID format check still holds, and a Gemini name is refused
  settings({elevenlabs:{apiKey:'test-elevenlabs-key'}});
  r=await voice('bad id!');assert.equal(r.status,400);assert.match(r.text,/letters and numbers/);
  r=await voice('Kore');assert.equal(r.status,409);assert.match(r.text,/is a Gemini voice/);
  r=await voice('NOpBlnGInO9m6vDvFkFC');assert.equal(r.status,200,r.text);assert.equal(saved(),'NOpBlnGInO9m6vDvFkFC');
  // Settings: not a model, and not a key (one with a line break would come back in fetch's header error)
  r=await post('/api/settings',{geminiModel:'constructor'});assert.equal(r.status,400);assert.match(r.text,/No Gemini model/);
  r=await post('/api/settings',{model:'eleven_v4',apiKey:'sk_test\nsecret-part'});assert.equal(r.status,400);assert.doesNotMatch(r.text,/secret-part/);
  r=await post('/api/settings',{geminiKey:'AIza test key'});assert.equal(r.status,400);assert.match(r.text,/doesn't look like an API key/);
  // Voice test: a provider typo never sends a typed key to the other provider
  r=await post('/api/voice/test',{provider:'Gemini',apiKey:'AIza-typed-key'});assert.equal(r.status,400);assert.match(r.text,/elevenlabs or gemini/);
  assert.deepEqual(JSON.parse(readFileSync(path.join(root,'.director','settings.json'),'utf8')),{elevenlabs:{apiKey:'test-elevenlabs-key'}}); // nothing written
});

// Chrome tabs, from an agent: `--concurrency` reaches the server from `render` and `make --render`, and a bad one never does.
test('an agent sets the Chrome tabs of a render, and is told how many to try after a crash',async t=>{
  const sent=[];let log=[];
  const server=http.createServer(async(req,res)=>{
    let raw='';for await(const c of req) raw+=c;
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/api/render'||url.pathname==='/api/director/autopilot') sent.push({path:url.pathname,...JSON.parse(raw)});
    const data=url.pathname==='/api/state'
      ? {agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[],stills:[]}}]}],jobs:log.length?[{id:3,brand:'demo',video:'video01',label:'Render demo/video01',status:'failed',progress:40,log}]:[]}
      : {ok:true,id:3,engine:'claude',claude:{ok:true},phase:'build',running:false,messages:[],storyboard:[],styles:[],voice:{length:10},autopilot:null};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const cli=async(...args)=>{
    const proc=spawn(process.execPath,[fileURLToPath(new URL('../video.mjs',import.meta.url)),...args,'--json'],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
    let out='';proc.stdout.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);
    const code=await new Promise(resolve=>proc.on('close',resolve));
    return {code,json:JSON.parse(out)};
  };
  let r=await cli('render','demo','video01','--concurrency=2');assert.equal(r.code,0);
  assert.equal(sent.at(-1).path,'/api/render');assert.equal(sent.at(-1).concurrency,2);
  r=await cli('render','demo','video01');assert.equal(r.code,0);assert.equal('concurrency' in sent.at(-1),false); // left to the free memory
  r=await cli('make','demo','video01','--render','--concurrency=3');assert.equal(r.code,0);
  assert.equal(sent.at(-1).path,'/api/director/autopilot');assert.equal(sent.at(-1).concurrency,3);assert.equal(sent.at(-1).render,true);
  const before=sent.length;
  for(const bad of [['render','demo','video01','--concurrency=0'],['render','demo','video01','--concurrency=lots'],['render','demo','video01','--concurrency'],['make','demo','video01','--render','--concurrency=1.5']]){
    r=await cli(...bad);assert.equal(r.code,1,bad.join(' '));assert.match(r.json.error,/whole number of Chrome tabs/);
  }
  r=await cli('make','demo','video01','--concurrency=2');assert.equal(r.code,1);assert.match(r.json.error,/use it with --render/);
  assert.equal(sent.length,before,'a bad number reached the server');
  // a crash: status's next names the number the render's own message gave
  log=['demo-video01-vertical: 40%','The render crashed (Target closed), most likely out of memory with 8 tabs.','Close other apps, or render with fewer tabs:','npm run render -- demo video01 --concurrency=4'];
  r=await cli('status','demo','video01');assert.match(r.json.next,/`render` again with --concurrency=4/);assert.equal(r.json.render.log.at(-1),log.at(-1));
  r=await cli('render','demo','video01','--wait');assert.equal(r.code,1);assert.match(r.json.next,/--concurrency=4/); // the --wait result says it too
  // any other failure: no made-up number
  log=['Error: poster frame 900 is not in the film'];
  r=await cli('status','demo','video01');assert.match(r.json.next,/see render\.log/);assert.doesNotMatch(r.json.next,/--concurrency/);
});

// The number reaches the render job's command line and its label, and a bad one is refused.
test('the dashboard hands the Chrome tabs to the render job, and refuses a bad number',async t=>{
  const {root,post:postTo}=await realDashboard(t);
  const post=(p,body)=>postTo(p,{brand:'demo',video:'video01',...body});
  const seen=path.join(root,'render-args.json');
  fs.writeFileSync(path.join(root,'tools','render.mjs'),`import fs from 'node:fs';fs.writeFileSync(${JSON.stringify(seen)},JSON.stringify(process.argv.slice(2)));`); // stands in for a render
  for(const concurrency of [0,-1,1.5,'2']){
    for(const route of ['/api/render','/api/director/autopilot']){
      const r=await post(route,{concurrency});assert.equal(r.status,400,`${route} ${concurrency}`);assert.match(r.text,/whole number of Chrome tabs/);
    }
  }
  assert.equal(fs.existsSync(seen),false);
  const r=await post('/api/render',{concurrency:2});assert.equal(r.status,200,r.text);assert.match(JSON.parse(r.text).label,/tabs 2/);
  for(let i=0;i<100&&!(fs.existsSync(seen)&&fs.statSync(seen).size);i++) await new Promise(resolve=>setTimeout(resolve,100));
  assert.deepEqual(JSON.parse(fs.readFileSync(seen,'utf8')),['demo','video01','--concurrency=2']);
});

// Styles, from an agent: the list says where each built-in style's sheet is, and --style takes a name or an id.
test('an agent lists the styles with their style sheets, and picks one by name',async t=>{
  const styles=[{id:'mine',name:'Mine',text:'my own look'},{id:'dark-keynote',name:'Dark Tech Keynote',text:'A dark stage.',builtin:true,category:'Information & Keynote',file:'styles/dark-keynote/STYLE.md',thumb:true},
    {id:'swiss-motion',name:'Swiss Motion Graphics',text:'A strict grid.',builtin:true,category:'Graphic & Type',file:'styles/swiss-motion/STYLE.md',thumb:false}];
  const picked=[];
  const server=http.createServer(async(req,res)=>{
    let raw='';for await(const c of req) raw+=c;
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/api/director/style') picked.push(JSON.parse(raw).styleId);
    const data=url.pathname==='/api/state'
      ? {agentApi:AGENT_API,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[],stills:[]}}]}],jobs:[]}
      : {ok:true,engine:'claude',claude:{ok:true},phase:'brief',running:false,messages:[],storyboard:[],styles,styleId:picked.at(-1)??null,voice:{length:10},autopilot:null};
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const cli=async(...args)=>{
    const proc=spawn(process.execPath,[fileURLToPath(new URL('../video.mjs',import.meta.url)),...args],{env:{...process.env,PORT:String(server.address().port)},windowsHide:true});
    let out='';proc.stdout.setEncoding('utf8');proc.stdout.on('data',x=>out+=x);
    return {code:await new Promise(resolve=>proc.on('close',resolve)),out};
  };
  let r=await cli('styles');assert.equal(r.code,0);
  const sheet=fileURLToPath(new URL('../../styles/dark-keynote/STYLE.md',import.meta.url));
  assert.ok(r.out.includes(`Dark Tech Keynote  (dark-keynote) · Information & Keynote\n  A dark stage.\n  ${sheet}`),r.out);
  assert.ok(r.out.includes('Mine  (mine)\n  my own look\n\n'),r.out); // one of the user's own: no category, no file
  // in JSON too, the sheet and the picture are whole paths an agent can open, or hand to the human
  const folder=fileURLToPath(new URL('../../styles/',import.meta.url));
  r=await cli('styles','--json');
  assert.deepEqual(JSON.parse(r.out).styles,[styles[0],
    {...styles[1],file:sheet,thumb:path.join(folder,'dark-keynote','thumb.jpg')},
    {...styles[2],file:path.join(folder,'swiss-motion','STYLE.md'),thumb:null}]);
  r=await cli('set','demo','video01','--style=dark tech keynote','--json');assert.equal(r.code,0,r.out);
  r=await cli('set','demo','video01','--style=mine','--json');assert.equal(r.code,0,r.out);
  r=await cli('set','demo','video01','--style=none','--json');assert.equal(r.code,0,r.out);
  assert.deepEqual(picked,['dark-keynote','mine',null]);
  r=await cli('set','demo','video01','--style=keynote','--json');assert.equal(r.code,1);assert.match(JSON.parse(r.out).error,/No style "keynote"/); // a starter the user deleted: it isn't in the list
  assert.equal(picked.length,3);
});

// The real server: the page gets every built-in style and its picture, and nothing else from styles/ is served.
test('the dashboard serves the film styles and their pictures, and keeps the built-in ones as they are',async t=>{
  const {root,post,url}=await realDashboard(t,{styles:true});
  const act=(action,body)=>post(`/api/director/${action}`,{brand:'demo',video:'video01',...body});
  let r=await act('style',{styleId:'dark-keynote'});assert.equal(r.status,200,r.text);
  const state=JSON.parse(r.text);
  assert.equal(state.styleId,'dark-keynote');assert.equal(state.styles.filter(s=>s.builtin).length,66);assert.equal(state.styles.filter(s=>!s.builtin).length,21);
  const keynote=state.styles.find(s=>s.id==='dark-keynote');
  assert.equal(keynote.builtin,true);assert.equal(keynote.thumb,true);assert.equal(keynote.file,'styles/dark-keynote/STYLE.md');
  const get=async p=>{const res=await fetch(url+p);await res.arrayBuffer();return {status:res.status,type:res.headers.get('content-type')};};
  assert.deepEqual(await get('/styles/dark-keynote/thumb.jpg'),{status:200,type:'image/jpeg'});
  fs.writeFileSync(path.join(root,'styles','library.json'),'[]');
  for(const p of ['/styles/library.json','/styles/dark-keynote/STYLE.md','/styles/dark-keynote/style.json','/styles/no-such-style/thumb.jpg','/styles/..%2Ftools/thumb.jpg','/styles/Dark-Keynote/thumb.jpg'])
    assert.notEqual((await get(p)).status,200,p);
  fs.rmSync(path.join(root,'styles','library.json'));
  r=await act('style-save',{name:'Dark Keynote',text:'mine'});assert.equal(r.status,409);assert.match(r.text,/built-in style/);
  r=await act('style-delete',{styleId:'dark-keynote'});assert.equal(r.status,409);assert.match(r.text,/can't be deleted/);
  assert.equal(JSON.parse((await act('style',{styleId:'dark-keynote'})).text).styleId,'dark-keynote'); // the refused delete didn't take it off the video
  assert.equal(fs.existsSync(path.join(root,'styles','library.json')),false);
  r=await act('style-save',{name:'House',text:'our look'});assert.equal(r.status,200,r.text);
  assert.deepEqual(JSON.parse(r.text).styles.slice(0,1),[{id:'house',name:'House',text:'our look'}]); // yours come first
  assert.equal(JSON.parse(r.text).styleId,'house');
});

// A tab left open through an update: the state it polls carries the page's version, which changes when a page file does.
test('the dashboard tells an open tab when its page files change',async t=>{
  const {root,url}=await realDashboard(t);
  const page=async()=>(await (await fetch(url+'/api/state')).json()).page;
  const first=await page();
  assert.equal(typeof first,'string');assert.equal(await page(),first); // steady while nothing changes
  for(const f of ['index.html','i18n.js','selects.js']){
    const before=await page();
    const file=path.join(root,'tools','dashboard',f);const later=new Date(fs.statSync(file).mtimeMs+5000);
    fs.utimesSync(file,later,later);
    assert.notEqual(await page(),before,f);
  }
});
