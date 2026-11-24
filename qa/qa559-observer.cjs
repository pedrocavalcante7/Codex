const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
w.HTMLElement.prototype.scrollTo=function(){};

(async()=>{await new Promise(r=>setTimeout(r,30));run("SETTINGS48.language='pt';db.chars=[fresh('Perf','Bruxo',5)];db.selected=db.chars[0].id;render();localizeCalls559=0;localizeDoc559=0;oldRoot559=localizeRoot559;localizeRoot559=function(root){localizeCalls559++;if(root===document)localizeDoc559++;return oldRoot559(root)}");await new Promise(r=>setTimeout(r,30));run('localizeCalls559=localizeDoc559=0');run("spark559=document.createElement('i');spark559.className='emitted-spark';document.body.append(spark559);spark559.remove()");await new Promise(r=>setTimeout(r,30));assert.equal(run('localizeCalls559'),0,'particles never trigger localization');run("button559=document.createElement('button');button559.textContent='Roupas de Viagem';document.body.append(button559);SETTINGS48.language='en'");await new Promise(r=>setTimeout(r,30));assert.equal(run('button559.textContent'),'Traveler’s Clothes');assert.equal(run('localizeDoc559'),0,'new strings localize only their subtree');console.log('PASS particle isolation and targeted localization');process.exit(0);})().catch(e=>{console.error(e);process.exit(1)});
