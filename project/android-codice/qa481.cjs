const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));








run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=1;render()");
const view=w.document.querySelector('#view');Object.defineProperty(view,'clientWidth',{get:()=>360});
function swipe(dx){const target=view.querySelector('h3')||view;for(const [type,x]of [['touchstart',180],['touchmove',180+dx],['touchend',180+dx]]){const e=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:type==='touchend'?[]:[{clientX:x,clientY:300}]},changedTouches:{value:[{clientX:x,clientY:300}]}});target.dispatchEvent(e);}}
swipe(-110);assert.equal(run('tab'),2,'central à esquerda abre Magias');let arrival=animations.filter(a=>a.el.classList.contains('sheet-motion-in472')).at(-1);assert(arrival.frames[0].transform.startsWith('translate3d(250px'),'página entra pela direita no fechamento do ciclo');
run('render()');swipe(110);assert.equal(run('tab'),1,'Magias à direita abre central');arrival=animations.filter(a=>a.el.classList.contains('sheet-motion-in472')).at(-1);assert(arrival.frames[0].transform.startsWith('translate3d(-250px'));
run('tab=2;render()');swipe(-110);assert.equal(run('tab'),0);run('render()');swipe(110);assert.equal(run('tab'),2);
run('SETTINGS48.tabMotion471=false;tab=1;render()');swipe(-110);assert.equal(run('tab'),2);
run('playState().hidden=[2];tab=1;render()');swipe(-110);assert.equal(run('tab'),0,'página oculta não participa');
run('playState().hidden=[1,2];tab=0;render()');swipe(-110);assert.equal(run('tab'),0,'uma única aba não se troca');
assert.equal(errors.length,0,errors.map(String).join('\n'));console.log('PASS central ↔ Magias, direção circular da animação, sentidos Personagem/Magias preservados, animação desligada e abas ocultas');dom.window.close();process.exit(0);
