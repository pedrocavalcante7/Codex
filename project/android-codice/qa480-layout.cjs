const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html.replace('<link rel="stylesheet" href="style.css">','<style>'+fs.readFileSync(dir+'/style.css','utf8')+'</style>'),{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));






run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=0;render()");
const view=w.document.querySelector('#view');view.style.padding='31px 12px 7px 10px';Object.defineProperty(view,'clientWidth',{get:()=>360});view.getBoundingClientRect=()=>({height:900,width:360,top:100,bottom:1000});run('render()');
function gesture(type,x,y,target){const e=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:type==='touchend'?[]:[{clientX:x,clientY:y}]},changedTouches:{value:[{clientX:x,clientY:y}]}});target.dispatchEvent(e);}
function resolvedTop(el){let value=w.getComputedStyle(el).top;return parseFloat(value.startsWith('var(')?view.style.getPropertyValue('--sheet-content-top479'):value);}
let target=view.querySelector('h3');gesture('touchstart',100,300,target);gesture('touchmove',210,301,target);
const preview=view.querySelector('.sheet-drag-preview475');assert(preview);assert(preview.querySelector('.class-spells451>.scroll-title475'));assert.equal(resolvedTop(preview),31);assert.equal(view.style.getPropertyValue('--sheet-content-left479'),'10px');assert.equal(view.style.getPropertyValue('--sheet-content-right479'),'12px');assert.equal(w.getComputedStyle(preview).width,'auto');
assert.equal(w.getComputedStyle(view.querySelector('.sheet-drag-current475')).marginTop,'0px');gesture('touchend',210,301,target);assert.equal(run('tab'),2);
const leaving=view.querySelector('.sheet-motion-out472');assert(leaving);assert.equal(resolvedTop(leaving),31);
const arrival=animations.filter(a=>a.el.classList.contains('sheet-motion-in472')).at(-1);assert.equal(arrival.frames[0].transform,'translate3d(-228px,0,0)');
run('render()');assert(!view.querySelector('.sheet-motion-out472'));view.style.paddingTop='42px';run('render()');target=view.querySelector('h3');gesture('touchstart',240,300,target);gesture('touchmove',130,301,target);assert.equal(resolvedTop(view.querySelector('.sheet-drag-preview475')),42);gesture('touchend',130,301,target);assert.equal(run('tab'),0);assert.equal(resolvedTop(view.querySelector('.sheet-motion-out472')),42);
assert.equal(errors.length,0,errors.map(String).join('\n'));console.log('PASS CSS real carregado: origem vertical compartilhada na prévia e saída, padding assimétrico, largura de conteúdo 338px, atualização de espaçamento, Personagem ↔ Magias');dom.window.close();process.exit(0);
