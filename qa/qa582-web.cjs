const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=(process.env.ASSET_DIR573||'/workspace/sites/codice-web/.sites-checkout/dist'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://codice-aventureiro-pedro.richibis14.chatgpt.site/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));














run("SETTINGS48.language='en';db.chars=[fresh('Persistent','Bruxo',11)];db.selected=db.chars[0].id;ensureCreator554();wd().classes554=[{name:'Bruxo',level:11,subclass:''}];wapply();render()");
assert.equal(w.document.title,'Codex');
run('openSettings48()');assert.equal(w.document.querySelectorAll('.settings-group582').length,4);assert.equal(w.document.querySelectorAll('#settings-language48').length,1);
run('wizardIndex=3;wrender()');for(const select of w.document.querySelectorAll('#wizard-body select')){assert.equal(w.getComputedStyle(select).display,'none');assert.equal(w.getComputedStyle(select.nextElementSibling).display,'flex');}
run('openInvocations580()');assert(!w.document.querySelector('.invocation-unavailable580'));assert(!w.document.getElementById('invocation-options580').textContent.includes('Investment of the Chain Master'));
run("toggleInvocation580('Pact of the Chain',true)");assert(w.document.getElementById('invocation-options580').textContent.includes('Investment of the Chain Master'));
run("toggleInvocation580('Investment of the Chain Master',true);toggleInvocation580('Pact of the Chain',false)");assert(!run("invocationPicker580.rows.some(r=>r.id==='Investment of the Chain Master')"));
run("tab=1;render();if(WEB580)render();else switchTab(1)");assert(w.document.querySelector('.inventory-config582'));assert(!w.document.querySelector('.inventory-order526'));assert(!w.document.querySelector('.inventory-weight526'));assert(w.document.querySelector('.inventory-weight582'));
run("playState().inventory=[{id:'b',name:'Z item',quantity:1,weight:2},{id:'a',name:'A item',quantity:3,weight:1}];save();sortInventory582('name')");assert.equal(run('playState().inventory[0].id'),'a');run("moveInventory582('a',1)");assert.equal(run('playState().inventory[1].id'),'a');
run('openFeatureSettings566()');assert(w.document.querySelector('.edit-in-settings582'));assert(!w.document.querySelector('#view .edit-character548'));
run("avatar582=avatarDefaults571(c());avatar582.body='shortbroad';svg582=avatarSvg571(avatar582)");assert(run("svg582.includes('avatar-ground582')"));
let microtasks=0,limited=false;const oq=w.queueMicrotask.bind(w);w.queueMicrotask=f=>{if(++microtasks>200){limited=true;return;}oq(f)};
run("SETTINGS48.language='pt-BR';localize48();render();SETTINGS48.language='en';localize48();render()");
setTimeout(()=>{assert(!limited,'localization loop');assert.deepEqual(errors,[]);assert.equal(w.document.title,'Codex');console.log('PASS 5.82: branding, themed ASI/species/class selectors, organized settings, eligible invocations and dependency cleanup, inventory header/sorting/persistence, feature edit settings, adaptive avatar shadow, asynchronous startup');dom.window.close();process.exit(0)},150);
