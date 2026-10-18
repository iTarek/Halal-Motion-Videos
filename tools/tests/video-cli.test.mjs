import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

for (const engine of ['codex','antigravity','claude']) test(`make selects ${engine} without requiring another engine`,async t=>{
  let selected=engine, started=false;
  const server=http.createServer(async(req,res)=>{
    let raw=''; for await(const c of req) raw+=c;
    const body=raw?JSON.parse(raw):{};
    const url=new URL(req.url,'http://localhost');
    let data;
    if(url.pathname==='/api/state') data={agentApi:3,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[]}}]}],jobs:[]};
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

// Agent first: everything a finished video comes with reaches an agent through `status` (CLAUDE.md → Agent first).
test('status hands an agent the MP4s, the caption and the cover images',async t=>{
  const server=http.createServer((req,res)=>{
    const url=new URL(req.url,'http://localhost');
    const stills=[{name:'demo-video01-vertical-poster.jpg',rel:'stills/demo-video01-vertical-poster.jpg'},{name:'vertical-030.jpg',rel:'stills/vertical-030.jpg'}];
    const data=url.pathname==='/api/state'
      ? {agentApi:3,brands:[{brand:'demo',videos:[{video:'video01',share:'Caption.',outputs:{videos:[{name:'demo-video01-vertical.mp4',rel:'demo-video01-vertical.mp4'}],stills}}]}],
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
