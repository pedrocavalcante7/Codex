const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));







let clock=1000;Object.defineProperty(w.performance,'now',{value:()=>clock});
run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=0;render()");
const view=w.document.querySelector('#view');Object.defineProperty(view,'clientWidth',{get:()=>360});view.style.padding='31px 12px 7px 10px';view.getBoundingClientRect=()=>({height:900,width:360,top:0,bottom:900});run('render()');
function event(type,x,y,target,dt=20){clock+=dt;const e=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:type==='touchend'?[]:[{clientX:x,clientY:y}]},changedTouches:{value:[{clientX:x,clientY:y}]}});target.dispatchEvent(e);return e;}
function click(el){const e=new w.MouseEvent('click',{bubbles:true,cancelable:true,detail:1});el.dispatchEvent(e);return e;}
run('window.previewCalls480=0;const realMagic480=magic;magic=function(){window.previewCalls480++;return realMagic480();}');const warmId=[...idleJobs.keys()].at(-1),warm=idleJobs.get(warmId);idleJobs.delete(warmId);warm();assert.equal(w.previewCalls480,1);
let target=view.querySelector('button[onclick*="sheetRoll"]');assert(target);const original=run('pendingDice');
event('touchstart',120,300,target);event('touchmove',240,302,target);assert(view.querySelector('.sheet-drag-preview475'));assert.equal(w.previewCalls480,1,'prévia pronta é reutilizada no primeiro movimento');event('touchend',240,302,target);assert.equal(run('tab'),2,'Personagem para direita abre Magias');assert(click(view.querySelector('.spell-attack-roll454')).defaultPrevented,'clique pós gesto bloqueado');assert.equal(run('pendingDice'),original);
assert(animations.filter(a=>a.el.classList.contains('sheet-motion-in472')).every(a=>a.opts.duration>=90&&a.opts.duration<=210));assert.equal(view.style.getPropertyValue('--sheet-content-top479'),'31px');
run('render()');target=view.querySelector('h3');event('touchstart',240,300,target);event('touchmove',205,301,target,30);event('touchend',205,301,target,10);assert.equal(run('tab'),0,'flick curto de Magias à esquerda abre Personagem');
run('render()');target=view.querySelector('button[onclick*="sheetRoll"]');event('touchstart',120,300,target);event('touchmove',134,300,target,250);event('touchend',134,300,target,350);assert.equal(run('tab'),0,'gesto pequeno e lento não troca');assert(click(target).defaultPrevented,'mesmo gesto cancelado não vira clique');
run('render()');target=view.querySelector('button[onclick*="sheetRoll"]');event('touchstart',120,300,target);event('touchend',121,300,target);assert(!click(target).defaultPrevented,'novo toque intencional liberado');assert(w.document.querySelector('#play-dialog').open);w.document.querySelector('#play-dialog').open=false;
run('render()');target=view.querySelector('input[type="checkbox"]');assert(target);const saves=run('JSON.stringify(c().saves)');event('touchstart',120,300,target);event('touchmove',240,301,target);assert(click(target).defaultPrevented);event('touchend',240,301,target);assert.equal(run('tab'),2);assert.equal(run('JSON.stringify(c().saves)'),saves);
run('tab=0;render()');target=view.querySelector('h3');event('touchstart',120,300,target);event('touchmove',123,420,target);event('touchend',123,420,target);assert.equal(run('tab'),0);assert(!view.querySelector('.sheet-drag-preview475'));
run('SETTINGS48.tabMotion471=false;render()');target=view.querySelector('h3');event('touchstart',120,300,target);event('touchmove',240,301,target);event('touchend',240,301,target);assert.equal(run('tab'),2);assert(!view.classList.contains('sheet-motion-active472'));
run('SETTINGS48.swipeTabs469=false;render()');target=view.querySelector('h3');event('touchstart',240,300,target);event('touchmove',120,301,target);event('touchend',120,301,target);assert.equal(run('tab'),2);
run('SETTINGS48.swipeTabs469=true;tab=0;render()');target=w.document.createElement('input');target.type='number';view.appendChild(target);event('touchstart',120,300,target);event('touchmove',240,301,target);event('touchend',240,301,target);assert.equal(run('tab'),0,'editor numérico não inicia navegação');
assert.equal(run('Object.keys(PORTRAITS454).length'),480);assert.equal(errors.length,0,errors.map(String).join('\n'));console.log('PASS sentidos novos, gesto sobre botões e checkboxes, clique fantasma bloqueado antes da rolagem, toque intencional mantido, flick rápido, gesto curto lento cancelado, rolagem vertical, campos de edição e configurações');dom.window.close();process.exit(0);
