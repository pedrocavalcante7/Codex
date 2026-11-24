const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=(process.env.ASSET_DIR573||'/workspace/sites/codice-web/.sites-checkout/dist'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://codice-aventureiro-pedro.richibis14.chatgpt.site/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));








run("SETTINGS48.language='en';render()");for(const id of ['character-page571','web-overview573','web-inventory573','web-spells573'])assert(w.document.getElementById(id),id);assert.equal(w.getComputedStyle(w.document.getElementById('tabs')).display,'none');assert.equal(w.getComputedStyle(w.document.getElementById('characters')).display,'none');assert.equal(w.document.querySelectorAll('#session-header').length,1);assert.equal(w.document.querySelectorAll('#portrait-band').length,1);assert.equal(w.document.querySelectorAll('#web-dashboard573').length,1);run('render();render()');assert.equal(w.document.querySelectorAll('#web-overview573').length,1);assert.equal(w.document.querySelectorAll('#web-inventory573').length,1);assert.equal(w.document.querySelectorAll('#web-spells573').length,1);assert.deepEqual(errors,[]);console.log('PASS 5.73 web: all four sections, no tabs or character bar, no duplicate controls on repeated renders');process.exit(0);
