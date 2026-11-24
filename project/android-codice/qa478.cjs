const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));





run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=0;render()");
const view=w.document.querySelector('#view');Object.defineProperty(view,'clientWidth',{get:()=>360});view.getBoundingClientRect=()=>({height:900,width:360,top:-200,bottom:700,left:0,right:360});
run('render()');assert.equal(view.style.minHeight,'900px');
function gesture(dx,dy=1){const target=view.querySelector('h3')||view;for(const [type,x,y]of [['touchstart',180,300],['touchmove',180+dx,300+dy],['touchend',180+dx,300+dy]]){const e=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:type==='touchend'?[]:[{clientX:x,clientY:y}]},changedTouches:{value:[{clientX:x,clientY:y}]}});target.dispatchEvent(e);}}
gesture(-110);assert.equal(run('tab'),2,'Personagem à esquerda abre Magias diretamente');assert(view.classList.contains('sheet-motion-active472'));assert.equal(view.style.minHeight,'900px');
run('render()');gesture(110);assert.equal(run('tab'),0,'Magias à direita abre Personagem diretamente');assert.equal(view.style.minHeight,'900px');
run('render()');gesture(1,150);assert.equal(run('tab'),0,'rolagem vertical não troca a aba');
run('SETTINGS48.tabMotion471=false');gesture(-110);assert.equal(run('tab'),2);assert(!view.classList.contains('sheet-motion-active472'));gesture(110);assert.equal(run('tab'),0);
run('SETTINGS48.swipeTabs469=false');gesture(-110);assert.equal(run('tab'),0);
assert.equal(w.document.querySelectorAll('#persistent-abilities471 .stat').length,6);assert.equal(w.document.querySelectorAll('#view .ability-crest465').length,6);
assert(animations.filter(a=>a.el.classList.contains('sheet-motion-in472')||a.el.classList.contains('sheet-motion-out472')).every(a=>a.frames.every(f=>/translate3d\([^,]+,0,0\)/.test(f.transform))));
assert.equal(run('Object.keys(PORTRAITS454).length'),480);assert.equal(errors.length,0,errors.map(String).join('\n'));console.log('PASS Personagem ↔ Magias, altura reservada antes e depois, movimento só horizontal, rolagem vertical independente, opções de gesto/animação e quadros preservados');dom.window.close();process.exit(0);
