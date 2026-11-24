const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));



run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=0;render()");
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .primary-ability-panel474').length,6);
assert.equal(w.document.querySelector('#tabs').previousElementSibling.id,'persistent-abilities471');
assert(!w.document.querySelector('#view #tabs'));assert.equal(w.document.querySelectorAll('#view .ability-detail-name474').length,6);
const attrs=w.document.querySelector('#persistent-abilities471').textContent;
run('switchTab(2)');assert.equal(run('tab'),2);assert(w.document.querySelector('.sheet-motion-active472'));assert(animations.some(a=>a.frames[0].transform.includes('translate3d')));
run('render()');assert.equal(w.document.querySelector('#persistent-abilities471').textContent,attrs);assert(!w.document.querySelector('.sheet-motion-out472'));
const title=w.document.querySelector('.class-spells451>.first-scroll-title');assert(title);assert(title.textContent.includes('Conjuração'));assert(!title.classList.contains('scroll-title471'));title.click();assert.equal(title.getAttribute('aria-expanded'),'false');title.click();
run('openSettings48()');const setting=w.document.querySelector('.swipe-animation-setting471 input');assert(setting.checked);setting.checked=false;setting.dispatchEvent(new w.Event('change'));assert.equal(run('SETTINGS48.tabMotion471'),false);w.document.querySelector('#play-dialog').open=false;
function event(kind,x,y,target){const e=new w.Event(kind,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:kind==='touchend'?[]:[{clientX:x,clientY:y}]},changedTouches:{value:[{clientX:x,clientY:y}]}});target.dispatchEvent(e);return e;}
let target=w.document.querySelector('.class-spells451>.first-scroll-title');event('touchstart',240,300,target);event('touchmove',240,410,target);event('touchend',240,410,target);assert.equal(run('tab'),2);
event('touchstart',240,300,target);event('touchmove',350,302,target);event('touchend',350,302,target);assert.equal(run('tab'),1);assert(!w.document.querySelector('.sheet-motion-active472'));
run('SETTINGS48.tabMotion471=true;render()');target=w.document.querySelector('#view .card h3')||w.document.querySelector('#view');event('touchstart',260,300,target);const moved=event('touchmove',120,302,target);assert(moved.defaultPrevented);assert(w.document.querySelector('.sheet-drag-preview475'));event('touchend',120,302,target);assert.equal(run('tab'),2);assert(!w.document.querySelector('.sheet-drag-preview475'));assert(w.document.querySelector('.sheet-motion-active472'));
run('render();SETTINGS48.swipeTabs469=false');target=w.document.querySelector('.scroll-title475');event('touchstart',240,300,target);event('touchmove',350,300,target);event('touchend',350,300,target);assert.equal(run('tab'),2);
assert.equal(run('Object.keys(PORTRAITS454).length'),480);assert.equal(errors.length,0,errors.map(String).join('\n'));
console.log('PASS Android scripts permitted, six persistent attributes, global tabs, two-page motion, drag preview, vertical scroll, settings independent, same title structure, collapse, 480 portraits');dom.window.close();process.exit(0);
