const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=path.join(__dirname,'assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},finish(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1],'utf8'));









(async()=>{
run("db.chars=[fresh('Teste','Feiticeiro',3)];db.selected=db.chars[0].id;tab=0;render()");
const view=w.document.querySelector('#view'),heights={0:1500,1:600,2:300};Object.defineProperty(view,'clientWidth',{get:()=>360});view.style.paddingTop='21px';view.getBoundingClientRect=()=>({height:Math.max(heights[run('tab')]||0,parseFloat(view.style.minHeight)||0),width:360,top:0,bottom:1500});
const scrollCalls=[];Object.defineProperty(w,'scrollY',{value:400,configurable:true});Object.defineProperty(w.navigator,'userAgent',{value:'Android WebView',configurable:true});w.scrollTo=arg=>scrollCalls.push(arg);
run('render()');assert.equal(view.style.minHeight,'','aba parada não reserva altura');
function swipe(dx){const target=view.querySelector('h3')||view;for(const [type,x]of [['touchstart',180],['touchmove',180+dx],['touchend',180+dx]]){const e=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:type==='touchend'?[]:[{clientX:x,clientY:300}]},changedTouches:{value:[{clientX:x,clientY:300}]}});target.dispatchEvent(e);if(type==='touchmove')assert.equal(view.style.minHeight,'1500px');}}
swipe(110);assert.equal(run('tab'),2);assert.equal(view.style.minHeight,'1500px','reserva existe durante a animação');assert.equal(view.style.getPropertyValue('--sheet-content-top479'),'21px');
for(const a of animations)a.finish();await new Promise(setImmediate);assert.equal(view.style.minHeight,'','fim da animação libera a altura');assert.equal(view.getBoundingClientRect().height,300,'aba curta recupera sua altura natural');
run('switchTab(0);render()');assert.equal(view.style.minHeight,'','render que interrompe transição também libera');assert.equal(view.getBoundingClientRect().height,1500);
run('SETTINGS48.tabMotion471=false;switchTab(1)');assert.equal(view.style.minHeight,'');assert.equal(view.getBoundingClientRect().height,600);
run('switchTab(2)');assert.equal(view.style.minHeight,'');assert.equal(view.getBoundingClientRect().height,300);
run('SETTINGS48.tabMotion471=true;switchTab(0);render()');
const target=view.querySelector('h3');for(const [type,x]of [['touchstart',180],['touchmove',200]]){const e=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:[{clientX:x,clientY:300}]},changedTouches:{value:[{clientX:x,clientY:300}]}});target.dispatchEvent(e);}
assert.equal(view.style.minHeight,'1500px');target.dispatchEvent(new w.Event('touchcancel',{bubbles:true}));assert.equal(view.style.minHeight,'','cancelamento libera altura');
assert(scrollCalls.every(a=>a.top===400),'nenhuma troca força topo');assert.equal(run('Object.keys(PORTRAITS454).length'),480);assert.equal(errors.length,0,errors.map(String).join('\n'));console.log('PASS altura natural em cada aba, reserva temporária durante movimento, liberação no fim/cancelamento/interrupção, troca sem animação, alinhamento mantido e sem comando de rolagem ao topo');dom.window.close();process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
