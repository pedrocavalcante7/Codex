const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');const {JSDOM}=require(process.env.JSDOM_PATH||'jsdom');
const dir=(process.env.ASSET_DIR573||'/workspace/sites/codice-aventureiro-web/.sites-checkout/dist'),html=fs.readFileSync(dir+'/index.html','utf8'),dom=new JSDOM(html,{url:'https://codice-aventureiro-pedro.richibis14.chatgpt.site/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
Object.defineProperty(w,'crypto',{value:require('crypto').webcrypto});w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.CodiceAndroid={exportJson(){}};w.matchMedia=()=>({matches:false,addEventListener(){}});w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},drawImage(){}});
let errors=[];w.addEventListener('error',e=>errors.push(e.error));const run=s=>vm.runInContext(s,dom.getInternalVMContext());const animations=[];w.Element.prototype.animate=function(frames,opts){let resolve;const finished=new Promise(r=>resolve=r);const a={finished,cancel(){resolve()},frames,opts,el:this};animations.push(a);return a;};
const idleJobs=new Map();let idleSerial=0;w.requestIdleCallback=cb=>{idleJobs.set(++idleSerial,cb);return idleSerial;};w.cancelIdleCallback=id=>idleJobs.delete(id);
for(const m of html.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(dir+'/'+m[1].split('?')[0],'utf8'));













const scrolls=[];w.scrollTo=args=>scrolls.push(args);
// Web navigation superseded by the no-tabs desktop wall in 5.80–5.83.
run("SETTINGS48.language='en';db.chars=[fresh('First','Mago',3)];db.selected=db.chars[0].id;SETTINGS48.navigation579='tabs';render();openSettings48()");assert.equal(run('dashboard579()'),true);assert(!w.document.getElementById('navigation-settings579'));assert.equal(w.getComputedStyle(w.document.getElementById('tabs')).display,'none');assert.equal(w.getComputedStyle(w.document.getElementById('web-dashboard573')).display,'grid');for(const id of ['character-page571','web-overview573','web-inventory573','web-spells573'])assert(w.document.getElementById(id));run("document.getElementById('play-dialog').close();render();render()");assert.equal(w.document.querySelectorAll('#session-header').length,1);assert.equal(w.document.querySelectorAll('#session-header>#persistent-abilities471').length,1);assert.deepEqual(errors,[]);console.log('PASS web navigation: always grid/no tabs, legacy tabs preference accepted without hiding panels, single integrated summary, no duplicate sections');process.exit(0);
