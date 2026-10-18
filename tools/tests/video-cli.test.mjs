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
    if(url.pathname==='/api/state') data={agentApi:2,brands:[{brand:'demo',videos:[{video:'video01',outputs:{videos:[]}}]}],jobs:[]};
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
