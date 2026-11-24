const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});




const check=run;
w.HTMLElement.prototype.scrollTo=function(){};
run("SETTINGS48.language='pt';db.chars=[fresh('Performance','Bruxo',5)];db.selected=db.chars[0].id;tab=0;SETTINGS48.tabMotion471=true;SETTINGS48.animations466={other:true};render();testRenderCount559=0;testBeforeRender559=render;render=function(){testRenderCount559++;return testBeforeRender559()}");
const view=w.document.getElementById('view');Object.defineProperty(view,'clientWidth',{value:412,configurable:true});
function touch(target,type,x,y=200){const ev=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperty(ev,'touches',{value:type==='touchend'||type==='touchcancel'?[]:[{clientX:x,clientY:y,identifier:1}]});Object.defineProperty(ev,'changedTouches',{value:[{clientX:x,clientY:y,identifier:1}]});target.dispatchEvent(ev);return ev;}
const target=w.document.querySelector('.brand');clock=1000;touch(target,'touchstart',140);clock+=40;touch(target,'touchmove',220);clock+=25;touch(target,'touchend',260);assert.equal(run('tab'),2,'swipe on the app header outside main changes tab');assert.equal(run('testRenderCount559'),1);run('sheetPager559.clear()');
clock+=100;touch(target,'touchstart',250);clock+=30;touch(target,'touchmove',160);clock+=25;touch(target,'touchend',120);assert.equal(run('tab'),0);assert.equal(run('testRenderCount559'),1,'returning page reuses nodes without a full render');run('sheetPager559.clear()');
assert(run('sheetPages559.size()')<=3);
const oldTab=run('tab');clock+=100;touch(target,'touchstart',150,100);clock+=50;touch(target,'touchmove',152,240);touch(target,'touchend',153,300);assert.equal(run('tab'),oldTab,'vertical scroll never changes tabs');
const input=w.document.querySelector('#persistent-abilities471 input');clock+=100;touch(input,'touchstart',140);clock+=25;touch(input,'touchmove',230);clock+=20;touch(input,'touchend',275);assert.equal(run('tab'),2,'unfocused attribute controls accept swipe');run('sheetPager559.clear()');
clock+=100;touch(target,'touchstart',250);clock+=30;touch(target,'touchmove',160);clock+=25;touch(target,'touchend',120);assert.equal(run('tab'),0);run('sheetPager559.clear()');
run('save()');assert.equal(run('sheetPages559.size()'),0,'saving state invalidates cached pages');
run("openSettings48()");clock+=100;touch(target,'touchstart',140);clock+=25;touch(target,'touchmove',230);clock+=20;touch(target,'touchend',275);assert.equal(run('tab'),0,'dialogs block background navigation');run("document.getElementById('play-dialog').close()");
run("SETTINGS48.tabMotion471=false;tab=0;render();testRenderCount559=0;switchTab(2);switchTab(0)");assert.equal(run('testRenderCount559'),1,'cache also works when animations are disabled');
for(const term of ['Roupas de viagem','Roupas de Viagem','roupas de viagem'])assert.equal(run(`phrase550(${JSON.stringify(term)},true)`),'Traveler’s Clothes');
assert.equal(run('phrase550("Traveler’s Clothes",false)'),'Roupas de viagem');
assert.equal(run("SHOP_ITEMS510.filter(e=>!e.en).length"),0,'every shop item has a complete English name');
assert.equal(run("phrase550('Nível de Bruxo',true)"),'Warlock level');
run("SETTINGS48.language='pt'");assert(run("invocationText559(INVOCATIONS558.find(e=>e.id==='Agonizing Blast'))").startsWith('Pré-requisito'));
run("SETTINGS48.language='en'");assert(run("invocationText559(INVOCATIONS558.find(e=>e.id==='Agonizing Blast'))").startsWith('Prerequisite'));
assert.ok([...w.document.querySelectorAll('style')].some(el=>el.textContent.includes('.hero{overflow:hidden')));
run("SETTINGS48.language='en'");assert(!/[áãç]/.test(run("featureText47(LEGACY_BASE557[0])")));assert(run("featureText47(DREAM_FEATURE_DATA556[1])").startsWith('When you finish'));
run("SETTINGS48.language='pt'");assert(run("featureText47(DREAM_FEATURE_DATA556[1])").startsWith('Ao terminar'));
assert.deepEqual(errors.map(String),[]);console.log('PASS 5.59: full-sheet gestures, cached return without full render, vertical scroll/dialog isolation, cache invalidation, complete bilingual shop names and invocation rules, bounded crest CSS');process.exit(0);
