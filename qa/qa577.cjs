const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=process.env.ASSET_DIR573||path.resolve(__dirname,'../project/android-codice/assets'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://appassets.androidplatform.net/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));











run("SETTINGS48.language='en';db.chars=[fresh('First','Mago',3),fresh('Second','Guerreiro',1)];db.selected=db.chars[0].id;tab=1;render()");
const title=kind=>w.document.querySelector((kind==='attacks'?'.attack-table':'.inventory526')+' > .panel-parchment577');
function closed(kind,expected){const t=title(kind);assert(t,kind);assert.equal(t.getAttribute('aria-expanded'),String(!expected));assert([...t.parentElement.children].filter(x=>x!==t).every(x=>x.classList.contains('panel-hidden469')===expected));return t;}
for(const kind of ['attacks','inventory']){const t=closed(kind,false);assert.equal(w.getComputedStyle(t).paddingLeft,'16px');assert.equal(w.getComputedStyle(t).paddingRight,'16px');}
closed('attacks',false).click();closed('attacks',true);closed('inventory',false);closed('inventory',false).click();closed('inventory',true);
run('render()');closed('attacks',true);closed('inventory',true);assert.equal(w.document.querySelectorAll('.attack-config512').length,1);title('attacks').querySelector('.attack-config512').click();assert(w.document.getElementById('play-dialog').open);closed('attacks',true);w.document.getElementById('play-dialog').close();
run("SETTINGS48.language='pt';render()");closed('attacks',true);closed('inventory',true);run('db.selected=db.chars[1].id;render()');closed('attacks',false);closed('inventory',false);run('db.selected=db.chars[0].id;render()');closed('attacks',true);closed('inventory',true);
closed('inventory',true).dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));closed('inventory',false);closed('attacks',true).click();closed('attacks',false);run('render();render()');assert.equal(w.document.querySelectorAll('.panel-parchment577').length,2);assert.equal(w.document.querySelectorAll('.attack-config512').length,1);
assert.deepEqual(errors,[]);console.log('PASS 5.77: matching parchments, both panels collapse/expand independently, keyboard, settings stay usable, state survives rerenders/language and isolates characters');process.exit(0);
