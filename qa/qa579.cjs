const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=process.env.ASSET_DIR573||path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));













const scrolls=[];w.scrollTo=args=>scrolls.push(args);
run("SETTINGS48.language='en';db.chars=[fresh('First','Mago',3)];db.selected=db.chars[0].id;render();openSettings48()");assert(w.document.getElementById('sheet-navigation579'));run("setNavigation579('vertical')");assert.equal(run('dashboard579()'),true);assert(w.document.body.classList.contains('vertical-sheet579'));for(const id of ['character-page571','web-overview573','web-inventory573','web-spells573'])assert(w.document.getElementById(id));assert.equal(w.document.querySelectorAll('#session-header').length,1);assert.equal(w.getComputedStyle(w.document.getElementById('web-dashboard573')).gap,'20px');assert.equal(w.getComputedStyle(w.document.documentElement).getPropertyValue('--panel-gap582'),'20px');assert.equal(w.getComputedStyle(w.document.getElementById('web-dashboard573')).flexDirection,'column');for(const card of w.document.querySelectorAll('#web-dashboard573 .card'))assert.equal(w.getComputedStyle(card).marginBottom,'0px');
run('setVerticalLoop579(true)');assert.equal(w.document.getElementById('sheet-loop579').disabled,false);assert.equal(JSON.parse(w.localStorage.getItem('codice-settings48')).navigation579,'vertical');assert.equal(JSON.parse(w.localStorage.getItem('codice-settings48')).verticalLoop579,true);w.document.getElementById('play-dialog').close();w.document.getElementById('play-dialog').removeAttribute('open');
Object.defineProperty(w.document.documentElement,'scrollHeight',{configurable:true,value:2000});Object.defineProperty(w,'innerHeight',{configurable:true,value:800});Object.defineProperty(w,'scrollY',{configurable:true,writable:true,value:1200});scrolls.length=0;assert.equal(run('loopToTop579()'),true);assert.equal(scrolls[0].top,0);assert.equal(scrolls[0].behavior,'smooth');run('clearTimeout(loopTimer579);loopBusy579=false;setVerticalLoop579(false)');scrolls.length=0;assert.equal(run('loopToTop579()'),false);assert.equal(scrolls.length,0);
run('setVerticalLoop579(true)');w.scrollY=500;assert.equal(run('loopToTop579()'),false);w.scrollY=1200;run('openSettings48()');assert.equal(run('loopToTop579()'),false);w.document.getElementById('play-dialog').close();w.document.getElementById('play-dialog').removeAttribute('open');
scrolls.length=0;run('wheelTime579=-Infinity');w.document.body.dispatchEvent(new w.WheelEvent('wheel',{deltaY:120,bubbles:true,cancelable:true}));assert.equal(scrolls.length,1);run('clearTimeout(loopTimer579);loopBusy579=false');

scrolls.length=0;w.scrollY=1200;const touch=(name,touches,changed)=>{const e=new w.Event(name,{bubbles:true});Object.defineProperties(e,{touches:{value:touches},changedTouches:{value:changed}});w.document.body.dispatchEvent(e);};touch('touchstart',[{clientX:100,clientY:400}],[]);touch('touchend',[],[{clientX:100,clientY:200}]);assert.equal(scrolls.length,1);run('clearTimeout(loopTimer579);loopBusy579=false');scrolls.length=0;w.scrollY=500;touch('touchstart',[{clientX:100,clientY:400}],[]);w.scrollY=1200;touch('touchend',[],[{clientX:100,clientY:200}]);assert.equal(scrolls.length,0);
const nested=w.document.createElement('div');nested.style.overflowY='auto';Object.defineProperties(nested,{scrollHeight:{value:500},clientHeight:{value:100}});w.document.body.append(nested);assert.equal(run('loopAllowed579(document.body.lastElementChild)'),false);nested.remove();

run("setNavigation579('tabs')");assert.equal(run('dashboard579()'),false);assert(!w.document.getElementById('web-dashboard573'));assert(!w.document.body.classList.contains('web-dashboard-mode573'));assert.equal(run('tab'),3);assert.equal(w.document.getElementById('character-page571').hidden,false);run('switchTab(1)');assert.equal(run('tab'),1);assert(w.document.querySelector('.attack-table'));run('openSettings48()');assert.equal(w.document.getElementById('sheet-loop579').disabled,true);w.document.getElementById('play-dialog').close();w.document.getElementById('play-dialog').removeAttribute('open');
run("setNavigation579('vertical');render();render()");assert.equal(w.document.querySelectorAll('#web-dashboard573').length,1);assert.equal(w.document.querySelectorAll('#web-spells573').length,1);assert.equal(w.document.querySelectorAll('#session-header').length,1);
assert.deepEqual(errors,[]);console.log('PASS 5.79: tabs/vertical switching, single column/equal gaps, settings persistence, smooth end loop, no loop when disabled/mid-page/dialog, wheel trigger, no duplicate sections');process.exit(0);
